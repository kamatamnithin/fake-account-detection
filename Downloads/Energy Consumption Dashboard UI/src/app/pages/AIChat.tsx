import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Bot, User, Sparkles, AlertCircle, RefreshCw, Copy, Trash2, Download, Mic, MicOff, Volume2, VolumeX, Square } from 'lucide-react';
import { geminiService } from '../../services/geminiService';
import { usePrediction } from '../../contexts/PredictionContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your SmartEnergy AI assistant powered by Google Gemini. I can help you understand your energy consumption patterns, provide insights, and answer questions about your forecasts. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [streamingContent, setStreamingContent] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [lastPredictionTimestamp, setLastPredictionTimestamp] = useState<Date | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const { getPredictionContext, predictionData } = usePrediction();

  const suggestedPrompts = [
    "What's my peak consumption time?",
    "How can I reduce energy costs?",
    "Explain my forecast accuracy",
    "What anomalies were detected?",
  ];

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setIsListening(false);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          let errorMessage = 'Voice recognition failed. Please try again.';
          
          switch (event.error) {
            case 'not-allowed':
            case 'permission-denied':
              errorMessage = 'Microphone access denied. Please enable microphone permissions in your browser settings and reload the page.';
              break;
            case 'no-speech':
              errorMessage = 'No speech detected. Please try speaking again.';
              break;
            case 'network':
              errorMessage = 'Network error. Please check your connection.';
              break;
            case 'audio-capture':
              errorMessage = 'Microphone not found. Please check your audio devices.';
              break;
            case 'aborted':
              errorMessage = 'Speech recognition was stopped.';
              break;
          }
          
          setError(errorMessage);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      setError('Voice input is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      setError(null);
      
      // Request microphone permission first
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(() => {
            // Permission granted, start recognition
            try {
              recognitionRef.current.start();
            } catch (err: any) {
              console.error('Failed to start recognition:', err);
              setError('Failed to start voice recognition. Please try again.');
              setIsListening(false);
            }
          })
          .catch((err) => {
            console.error('Microphone permission denied:', err);
            setError('Microphone access denied. Please enable microphone permissions in your browser settings.');
            setIsListening(false);
          });
      } else {
        // Fallback for browsers without getUserMedia
        try {
          recognitionRef.current.start();
        } catch (err: any) {
          console.error('Failed to start recognition:', err);
          setError('Failed to start voice recognition. Please enable microphone permissions.');
          setIsListening(false);
        }
      }
    }
  };

  const speakText = (text: string) => {
    if (!synthRef.current || !voiceEnabled) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent]);

  // Additional effect to ensure smooth scrolling during streaming
  useEffect(() => {
    if (isTyping && streamingContent) {
      const timer = setTimeout(() => {
        scrollToBottom();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [streamingContent, isTyping]);

  // Auto-discuss predictions when they are made
  useEffect(() => {
    const { currentPrediction, timestamp } = predictionData;
    
    // Check if there's a new prediction
    if (currentPrediction && timestamp && timestamp !== lastPredictionTimestamp) {
      setLastPredictionTimestamp(timestamp);
      
      // Only auto-discuss if the chat has been used (more than just the welcome message)
      if (messages.length > 1) {
        // Add a notification message
        const notificationMessage: Message = {
          id: `prediction-${Date.now()}`,
          role: 'assistant',
          content: `🔔 I noticed you just generated a new energy prediction! Let me analyze it for you...`,
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, notificationMessage]);
        
        // Trigger automatic analysis after a short delay
        setTimeout(() => {
          handleAutoPredictionDiscussion();
        }, 1500);
      }
    }
  }, [predictionData.currentPrediction, predictionData.timestamp]);

  const handleAutoPredictionDiscussion = async () => {
    if (isTyping) return;

    setIsTyping(true);
    setError(null);
    setStreamingContent('');
    stopSpeaking();

    try {
      const context = getPredictionContext();
      const analysisPrompt = "Please analyze this energy prediction and provide actionable insights.";

      let fullResponse = '';

      await geminiService.sendMessageStream(
        analysisPrompt,
        (chunk) => {
          fullResponse += chunk;
          setStreamingContent(fullResponse);
        },
        context
      );

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fullResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setStreamingContent('');
      
      // Speak the AI response if voice is enabled
      if (voiceEnabled) {
        speakText(fullResponse);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to analyze prediction. Please try again.');
      console.error('Auto prediction discussion error:', err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setError(null);
    setStreamingContent('');
    stopSpeaking();

    try {
      const context = getPredictionContext();

      let fullResponse = '';

      await geminiService.sendMessageStream(
        input,
        (chunk) => {
          fullResponse += chunk;
          setStreamingContent(fullResponse);
        },
        context
      );

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fullResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setStreamingContent('');
      
      // Speak the AI response if voice is enabled
      if (voiceEnabled) {
        speakText(fullResponse);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to get AI response. Please try again.');
      console.error('AI Chat error:', err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: 'Hello! I\'m your SmartEnergy AI assistant powered by Google Gemini. I can help you understand your energy consumption patterns, provide insights, and answer questions about your forecasts. How can I help you today?',
        timestamp: new Date(),
      },
    ]);
    setError(null);
    geminiService.resetSession();
  };

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const handleExportChat = () => {
    const chatText = messages
      .map((msg) => `[${msg.role.toUpperCase()}] ${msg.content}`)
      .join('\n\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smartenergy-chat-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const remainingMessages = geminiService.getRemainingMessages();
  const isConfigured = geminiService.isConfigured();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-slate-800">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl border-2 border-indigo-200 rounded-3xl overflow-hidden flex flex-col h-[calc(100vh-8rem)] shadow-2xl"
        >
          {/* Header */}
          <div className="border-b border-indigo-200 p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/30">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">AI Energy Assistant</h1>
                  <p className="text-slate-600 text-sm flex items-center gap-2">
                    {isConfigured ? (
                      <>
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Powered by Google Gemini • {remainingMessages} messages remaining
                      </>
                    ) : (
                      <>
                        <span className="inline-block w-2 h-2 bg-amber-500 rounded-full"></span>
                        Demo Mode - Configure API key for full features
                      </>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleExportChat}
                  className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition-colors"
                  title="Export chat"
                >
                  <Download className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClearChat}
                  className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition-colors"
                  title="Clear chat"
                >
                  <Trash2 className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
            
            {!isConfigured && (
              <div className="mt-4 p-4 bg-amber-50 border-2 border-amber-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-amber-800 font-semibold mb-1">API Not Configured</p>
                  <p className="text-amber-700">
                    To enable real AI responses, add your Gemini API key to the <code className="px-1.5 py-0.5 bg-white border border-amber-200 rounded">env</code> file.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-br from-white/50 to-blue-50/30">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}

                <div className="flex flex-col gap-2 max-w-[70%]">
                  <div
                    className={`rounded-2xl px-5 py-3 shadow-md ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                        : 'bg-white border-2 border-indigo-100 text-slate-800'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                  {message.role === 'assistant' && (
                    <button
                      onClick={() => handleCopyMessage(message.content)}
                      className="self-start flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 transition-colors font-medium"
                    >
                      <Copy className="w-3 h-3" />
                      Copy
                    </button>
                  )}
                </div>

                {message.role === 'user' && (
                  <div className="flex-shrink-0 w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center shadow-md">
                    <User className="w-5 h-5 text-slate-700" />
                  </div>
                )}
              </motion.div>
            ))}

            {/* Streaming response */}
            {isTyping && streamingContent && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white border-2 border-indigo-100 rounded-2xl px-5 py-3 max-w-[70%] shadow-md">
                  <p className="text-sm leading-relaxed text-slate-800 whitespace-pre-wrap">
                    {streamingContent}
                    <span className="inline-block w-1 h-4 bg-blue-600 ml-1 animate-pulse" />
                  </p>
                </div>
              </motion.div>
            )}

            {/* Typing indicator */}
            {isTyping && !streamingContent && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white border-2 border-indigo-100 rounded-2xl px-5 py-3 shadow-md">
                  <div className="flex gap-1">
                    <motion.div
                      className="w-2 h-2 bg-blue-600 rounded-full"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-blue-600 rounded-full"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-blue-600 rounded-full"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 justify-center"
              >
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center gap-3 max-w-md shadow-md">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                  <button
                    onClick={() => setError(null)}
                    className="ml-auto text-red-600 hover:text-red-700"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          {messages.length === 1 && (
            <div className="px-6 pb-4 bg-gradient-to-br from-white/50 to-blue-50/30">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span className="text-sm text-slate-600 font-medium">Suggested questions:</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {suggestedPrompts.map((prompt, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setInput(prompt)}
                    className="text-left px-4 py-3 bg-white hover:bg-blue-50 border-2 border-indigo-200 rounded-xl text-sm text-slate-700 transition-colors shadow-sm hover:shadow-md"
                  >
                    {prompt}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t-2 border-indigo-200 p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex gap-2 mb-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={`p-3 rounded-xl transition-all ${
                  voiceEnabled
                    ? 'bg-green-50 text-green-600 border-2 border-green-200'
                    : 'bg-gray-50 text-gray-400 border-2 border-gray-200'
                }`}
                title={voiceEnabled ? 'Voice output enabled' : 'Voice output disabled'}
              >
                {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </motion.button>
              {isSpeaking && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={stopSpeaking}
                  className="p-3 rounded-xl bg-red-50 text-red-600 border-2 border-red-200 hover:bg-red-100 transition-all"
                  title="Stop speaking"
                >
                  <Square className="w-5 h-5" />
                </motion.button>
              )}
              <div className="flex-1 text-center">
                <span className="text-xs text-slate-600">
                  {isListening ? '🎤 Listening...' : isSpeaking ? '🔊 Speaking...' : ''}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleVoiceInput}
                disabled={isTyping}
                className={`p-3 rounded-xl transition-all ${
                  isListening
                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse'
                    : 'bg-white border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                title={isListening ? 'Stop listening' : 'Start voice input'}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </motion.button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything about your energy data..."
                disabled={isTyping || isListening}
                className="flex-1 bg-white border-2 border-indigo-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:shadow-blue-500/30 transition-all"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}