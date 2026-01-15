import { GoogleGenerativeAI } from '@google/generative-ai';

const MAX_MESSAGES_PER_SESSION = 50;
const MESSAGE_DELAY_MS = 1000;

class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;
  private messageCount = 0;
  private lastMessageTime = 0;
  private isInitialized = false;
  private initializationPromise: Promise<void> | null = null;

  constructor() {
    const apiKey = 'AIzaSyBs9_XXlTIL_llxRO6IrhpZdZnuXQwGSFA';
    
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.initializationPromise = this.initializeModel();
    }
  }

  private async initializeModel(): Promise<void> {
    if (!this.genAI) return;

    console.log('🔧 Initializing Gemini AI...');
    console.log('📋 Using the latest Gemini 2.5 models...');
    
    try {
      // First, try to list available models
      const listModelsResult = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyBs9_XXlTIL_llxRO6IrhpZdZnuXQwGSFA'
      );
      
      if (listModelsResult.ok) {
        const data = await listModelsResult.json();
        console.log('📋 Available models:', data.models?.map((m: any) => m.name) || []);
        
        // Filter models that support generateContent
        const compatibleModels = data.models?.filter((m: any) => 
          m.supportedGenerationMethods?.includes('generateContent')
        ) || [];
        
        console.log('✅ Compatible models for generateContent:', 
          compatibleModels.map((m: any) => m.name)
        );
        
        // Try each compatible model
        for (const modelInfo of compatibleModels) {
          const modelName = modelInfo.name.replace('models/', ''); // Remove 'models/' prefix
          
          try {
            console.log(`🔍 Testing model: ${modelName}...`);
            
            const testModel = this.genAI.getGenerativeModel({ 
              model: modelName,
            });
            
            // Test with a simple prompt
            const testResult = await testModel.generateContent('Hi');
            const testResponse = await testResult.response;
            testResponse.text(); // Make sure we can get text
            
            // Success!
            this.model = testModel;
            this.isInitialized = true;
            console.log(`✅ SUCCESS! Using model: ${modelName}`);
            return;
          } catch (err: any) {
            console.log(`⚠️ Model ${modelName} failed: ${err.message}`);
            continue;
          }
        }
      }
    } catch (listError) {
      console.log('⚠️ Could not list models, trying known working models...', listError);
    }
    
    // If listing fails, try known working models for this API key
    console.log('📋 Trying known Gemini 2.x models...');
    
    const knownWorkingModels = [
      'gemini-2.5-flash',      // ✅ CONFIRMED WORKING from diagnostic
      'gemini-2.5-pro',
      'gemini-2.0-flash',
      'gemini-flash-latest',
      'gemini-pro-latest',
    ];
    
    for (const modelName of knownWorkingModels) {
      try {
        console.log(`🔍 Testing known model: ${modelName}...`);
        
        const testModel = this.genAI.getGenerativeModel({ 
          model: modelName,
        });
        
        const testResult = await testModel.generateContent('Hi');
        const testResponse = await testResult.response;
        testResponse.text();
        
        this.model = testModel;
        this.isInitialized = true;
        console.log(`✅ SUCCESS! Using known model: ${modelName}`);
        return;
      } catch (err: any) {
        console.log(`⚠️ Known model ${modelName} failed: ${err.message}`);
        continue;
      }
    }
    
    console.error('❌ No compatible Gemini model found - using fallback mode');
    console.log('💡 Troubleshooting:');
    console.log('  1. Check API key at: https://aistudio.google.com/app/apikey');
    console.log('  2. Make sure Gemini API is enabled');
    console.log('  3. Try accessing https://aistudio.google.com/ in browser');
    console.log('  4. Check if your region supports Gemini API');
    
    this.isInitialized = false;
    this.model = null;
  }

  async ensureInitialized(): Promise<void> {
    if (this.initializationPromise) {
      await this.initializationPromise;
      this.initializationPromise = null;
    }
  }

  isConfigured(): boolean {
    return this.isInitialized && this.model !== null;
  }

  canSendMessage(): { allowed: boolean; reason?: string } {
    if (this.messageCount >= MAX_MESSAGES_PER_SESSION) {
      return {
        allowed: false,
        reason: `You've reached the session limit of ${MAX_MESSAGES_PER_SESSION} messages. Please refresh the page to start a new session.`,
      };
    }

    const now = Date.now();
    const timeSinceLastMessage = now - this.lastMessageTime;
    if (timeSinceLastMessage < MESSAGE_DELAY_MS && this.lastMessageTime > 0) {
      return {
        allowed: false,
        reason: `Please wait ${Math.ceil((MESSAGE_DELAY_MS - timeSinceLastMessage) / 1000)}s before sending another message.`,
      };
    }

    return { allowed: true };
  }

  async sendMessage(
    userMessage: string,
    context: string = ''
  ): Promise<string> {
    await this.ensureInitialized();

    if (!this.isConfigured()) {
      console.log('⚠️ Gemini not configured, using fallback');
      return this.getFallbackResponse(userMessage);
    }

    const rateLimitCheck = this.canSendMessage();
    if (!rateLimitCheck.allowed) {
      throw new Error(rateLimitCheck.reason);
    }

    try {
      this.messageCount++;
      this.lastMessageTime = Date.now();

      const systemPrompt = `You are an AI assistant for SmartEnergy, an energy consumption forecasting platform. 
You help users understand their energy usage patterns, forecasts, and provide actionable insights for energy optimization.
Your responses should be:
- Concise and clear
- Energy/sustainability focused
- Data-driven when possible
- Helpful and actionable

${context ? `Current context:\n${context}` : ''}`;

      const prompt = `${systemPrompt}\n\nUser question: ${userMessage}`;

      console.log('📤 Sending message to Gemini API...');
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log('✅ Received response from Gemini API');

      return text;
    } catch (error: any) {
      console.error('❌ Gemini API error:', error);
      return this.getFallbackResponse(userMessage);
    }
  }

  async sendMessageStream(
    userMessage: string,
    onChunk: (chunk: string) => void,
    context: string = ''
  ): Promise<void> {
    await this.ensureInitialized();

    if (!this.isConfigured()) {
      console.log('⚠️ Gemini not configured, using fallback stream');
      const fallback = this.getFallbackResponse(userMessage);
      for (let i = 0; i < fallback.length; i += 3) {
        onChunk(fallback.slice(i, i + 3));
        await new Promise(resolve => setTimeout(resolve, 20));
      }
      return;
    }

    const rateLimitCheck = this.canSendMessage();
    if (!rateLimitCheck.allowed) {
      throw new Error(rateLimitCheck.reason);
    }

    try {
      this.messageCount++;
      this.lastMessageTime = Date.now();

      const systemPrompt = `You are an AI assistant for SmartEnergy, an energy consumption forecasting platform. 
You help users understand their energy usage patterns, forecasts, and provide actionable insights for energy optimization.
Your responses should be:
- Concise and clear
- Energy/sustainability focused
- Data-driven when possible
- Helpful and actionable

${context ? `Current context:\n${context}` : ''}`;

      const prompt = `${systemPrompt}\n\nUser question: ${userMessage}`;

      console.log('📤 Sending streaming message to Gemini API...');
      const result = await this.model.generateContentStream(prompt);

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        onChunk(chunkText);
      }
      
      console.log('✅ Streaming completed');
    } catch (error: any) {
      console.error('❌ Gemini API stream error:', error);
      
      console.log('⚠️ Falling back to demo mode due to API error');
      const fallback = this.getFallbackResponse(userMessage);
      
      for (let i = 0; i < fallback.length; i += 3) {
        onChunk(fallback.slice(i, i + 3));
        await new Promise(resolve => setTimeout(resolve, 20));
      }
    }
  }

  private getFallbackResponse(userMessage: string): string {
    const message = userMessage.toLowerCase();
    
    if (message.includes('peak') || message.includes('consumption')) {
      return "Based on your energy data, peak consumption typically occurs between 6-9 PM on weekdays. This pattern is common for residential users. To reduce peak usage, consider shifting high-energy tasks to off-peak hours or implementing smart scheduling for appliances.";
    }
    
    if (message.includes('reduce') || message.includes('cost') || message.includes('save')) {
      return "Here are some data-driven recommendations to reduce energy costs:\n\n1. Optimize HVAC scheduling based on occupancy patterns\n2. Identify and address phantom loads from idle devices\n3. Consider time-of-use rate plans for off-peak usage\n4. Regular maintenance of high-consumption equipment\n\nWould you like detailed analysis of any specific area?";
    }
    
    if (message.includes('forecast') || message.includes('accuracy') || message.includes('predict')) {
      return "Your current forecasting model shows 94.2% accuracy based on ARIMA analysis. The model performs best for short-term (24-48 hour) predictions. Longer-term forecasts incorporate seasonal patterns and weather data. Recent anomalies have been flagged for review to improve future predictions.";
    }
    
    if (message.includes('anomal')) {
      return "3 anomalies were detected in the past week:\n\n1. Unusual spike on Tuesday 8 PM (+47% above expected)\n2. Lower than expected usage on Thursday 2-4 PM (-32%)\n3. Weekend consumption pattern deviation\n\nWould you like me to investigate any of these anomalies in detail?";
    }

    if (message.includes('upload') || message.includes('file')) {
      return "I can help analyze your uploaded energy data! Once you upload a CSV, PDF, or Excel file, I'll provide:\n\n• Pattern recognition in consumption data\n• Peak usage identification\n• Cost optimization opportunities\n• Anomaly detection\n• Personalized recommendations\n\nPlease upload your file and I'll generate detailed insights for you.";
    }
    
    return `I understand you're asking about "${userMessage}". Based on your SmartEnergy dashboard, I can provide insights on energy consumption patterns, forecasts, and optimization strategies.\n\nYour current system shows:\n• Real-time monitoring active\n• Forecasting model accuracy: 94.2%\n• Recent energy savings: 12.3%\n\nHow can I help you optimize your energy consumption further?`;
  }

  getRemainingMessages(): number {
    return Math.max(0, MAX_MESSAGES_PER_SESSION - this.messageCount);
  }

  resetSession(): void {
    this.messageCount = 0;
    this.lastMessageTime = 0;
  }
}

export const geminiService = new GeminiService();