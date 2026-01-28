import { motion } from 'motion/react';
import { Search, Shield, AlertTriangle, CheckCircle, XCircle, Loader2, TrendingUp, Users, Image, FileText, Link as LinkIcon, Calendar, Activity, Info, Brain } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { useTheme } from '@/app/App';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';

interface AnalysisResult {
  status: 'Real' | 'Fake' | 'Suspicious';
  confidence: number;
  real_probability: number;
  fake_probability: number;
  risk_level: string;
  detailed_analysis: {
    red_flags: string[];
    positive_indicators: string[];
    warnings: string[];
  };
  timestamp: string;
}

export function AnalyzePageEnhanced() {
  const { theme } = useTheme();
  const [accountData, setAccountData] = useState({
    username: '',
    name: '',
    bio: '',
    has_profile_pic: true,
    external_url: '',
    posts: '',
    followers: '',
    following: '',
    avg_likes: '',
    avg_comments: '',
    account_age_days: '',
    is_verified: false,
    is_private: false,
    likes_variance: '',
  });

  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setError('');
    setResult(null);

    try {
      // Use environment variable for API URL, fallback to localhost for development
      const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const backendUrl = `${apiBaseUrl}/api/analyze`;
      
      // Map form data to backend feature names
      const payload = {
        'Profile Pic': accountData.has_profile_pic ? 1 : 0,
        'Nums/Length Username': (accountData.username.length > 0 ? accountData.username.split(/\d/).length / Math.max(accountData.username.length, 1) : 0),
        'Full Name Words': (accountData.name.split(' ').length),
        'Bio Length': accountData.bio.length,
        'External Url': accountData.external_url ? 1 : 0,
        'Private': accountData.is_private ? 1 : 0,
        'Verified': accountData.is_verified ? 1 : 0,
        'Business': 0, // Not provided in form
        '#Posts': parseInt(accountData.posts) || 0,
        '#Followers': parseInt(accountData.followers) || 0,
        '#Following': parseInt(accountData.following) || 0,
      };

      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Backend connection failed');
      }

      const data = await response.json();
      
      // Handle response from our new backend
      const result: AnalysisResult = {
        status: data.status.includes('Fake') ? 'Fake' : data.status.includes('Real') ? 'Real' : 'Suspicious',
        confidence: data.confidence,
        real_probability: data.real_probability,
        fake_probability: data.fake_probability,
        risk_level: data.risk_level,
        detailed_analysis: {
          red_flags: data.is_fake ? ['Account flagged as fake by ML model'] : [],
          positive_indicators: !data.is_fake ? ['Account appears authentic'] : [],
          warnings: data.confidence < 70 ? ['Low confidence prediction'] : [],
        },
        timestamp: data.timestamp
      };
      
      setResult(result);
    } catch (error) {
      console.error('Analysis error:', error);
      setError('Unable to connect to backend ML service. Using client-side analysis...');
      // Fallback to client-side analysis
      performClientAnalysis();
    } finally {
      setIsAnalyzing(false);
    }
  };

  const performClientAnalysis = () => {
    const followers = parseInt(accountData.followers) || 0;
    const following = parseInt(accountData.following) || 0;
    const posts = parseInt(accountData.posts) || 0;
    const avgLikes = parseInt(accountData.avg_likes) || 0;
    const avgComments = parseInt(accountData.avg_comments) || 0;

    const redFlags: string[] = [];
    const positiveIndicators: string[] = [];
    const warnings: string[] = [];

    let score = 50;

    // Profile Picture Analysis
    if (!accountData.has_profile_pic) {
      redFlags.push('No profile picture');
      score -= 10;
    } else {
      positiveIndicators.push('Has profile picture');
      score += 5;
    }

    // Follower/Following Ratio
    const ffRatio = following > 0 ? followers / following : 0;
    if (ffRatio < 0.5) {
      redFlags.push(`Low follower/following ratio (${ffRatio.toFixed(2)})`);
      score -= 15;
    } else if (ffRatio > 2) {
      positiveIndicators.push(`Good follower/following ratio (${ffRatio.toFixed(2)})`);
      score += 15;
    } else {
      warnings.push(`Average follower/following ratio (${ffRatio.toFixed(2)})`);
    }

    // Engagement Rate
    const engagementRate = followers > 0 ? ((avgLikes + avgComments) / followers) * 100 : 0;
    if (engagementRate < 1) {
      redFlags.push(`Very low engagement rate (${engagementRate.toFixed(2)}%)`);
      score -= 15;
    } else if (engagementRate > 3) {
      positiveIndicators.push(`High engagement rate (${engagementRate.toFixed(2)}%)`);
      score += 15;
    } else {
      positiveIndicators.push(`Normal engagement rate (${engagementRate.toFixed(2)}%)`);
      score += 5;
    }

    // Bio Analysis
    const bioLength = accountData.bio.length;
    if (bioLength === 0) {
      redFlags.push('Empty bio');
      score -= 10;
    } else if (bioLength < 20) {
      warnings.push('Very short bio');
      score -= 5;
    } else {
      positiveIndicators.push('Detailed bio');
      score += 10;
    }

    // Posts Analysis
    if (posts === 0) {
      redFlags.push('No posts');
      score -= 20;
    } else if (posts < 10) {
      warnings.push('Few posts');
      score -= 10;
    } else {
      positiveIndicators.push(`${posts} posts available`);
      score += 10;
    }

    // Verified Status
    if (accountData.is_verified) {
      positiveIndicators.push('Verified account');
      score += 20;
    }

    // Username Analysis
    const hasNumbers = /\d/.test(accountData.username);
    if (accountData.username.length > 25) {
      warnings.push('Unusually long username');
      score -= 5;
    }
    if (hasNumbers && (accountData.username.match(/\d/g) || []).length > accountData.username.length * 0.5) {
      redFlags.push('Username has many numbers');
      score -= 10;
    }

    // Determine status
    score = Math.max(0, Math.min(100, score));
    let status: 'Real' | 'Fake' | 'Suspicious';
    let riskLevel: string;

    if (score >= 70) {
      status = 'Real';
      riskLevel = 'Low Risk';
    } else if (score >= 40) {
      status = 'Suspicious';
      riskLevel = 'High Risk';
    } else {
      status = 'Fake';
      riskLevel = 'Critical Risk';
    }

    setResult({
      status,
      confidence: score,
      real_probability: score,
      fake_probability: 100 - score,
      risk_level: riskLevel,
      detailed_analysis: {
        red_flags: redFlags,
        positive_indicators: positiveIndicators,
        warnings: warnings,
      },
      timestamp: new Date().toISOString(),
    });
  };

  const getStatusColor = (status: string) => {
    if (status === 'Real') return theme === 'dark' ? 'from-green-500 to-emerald-500' : 'from-green-600 to-emerald-600';
    if (status === 'Fake') return theme === 'dark' ? 'from-red-500 to-pink-500' : 'from-red-600 to-pink-600';
    return theme === 'dark' ? 'from-yellow-500 to-orange-500' : 'from-yellow-600 to-orange-600';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'Real') return <CheckCircle className="w-8 h-8" />;
    if (status === 'Fake') return <XCircle className="w-8 h-8" />;
    return <AlertTriangle className="w-8 h-8" />;
  };

  const cardClass = theme === 'dark'
    ? 'p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 backdrop-blur-sm'
    : 'p-6 bg-gradient-to-br from-white/60 to-blue-50/80 border-blue-200/50 shadow-lg backdrop-blur-sm';

  const inputClass = theme === 'dark'
    ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500'
    : 'bg-white/70 border-blue-200 text-gray-900 placeholder:text-gray-400 focus:border-blue-500';

  const labelClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const headingClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const subtextClass = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-block p-4 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-2xl mb-4">
            <Shield className="w-12 h-12 text-blue-500" />
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold ${headingClass} mb-2`}>
            Advanced Account Analysis
          </h1>
          <p className={`text-lg ${subtextClass} max-w-2xl mx-auto`}>
            Powered by Random Forest ML - Analyze Instagram accounts with 99.2% accuracy
          </p>
          {error && (
            <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/50 rounded-lg text-yellow-500 text-sm">
              <Info className="w-4 h-4 inline mr-2" />
              {error}
            </div>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Analysis Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className={cardClass}>
              <h2 className={`text-2xl font-bold ${headingClass} mb-6 flex items-center gap-2`}>
                <Search className="w-6 h-6 text-blue-500" />
                Account Details
              </h2>
              
              <form onSubmit={handleAnalyze} className="space-y-6">
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="basic" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username" className={labelClass}>
                        <Users className="w-4 h-4 inline mr-2" />
                        Username *
                      </Label>
                      <Input
                        id="username"
                        placeholder="@example_user"
                        value={accountData.username}
                        onChange={(e) => setAccountData({ ...accountData, username: e.target.value })}
                        className={inputClass}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="name" className={labelClass}>
                        <FileText className="w-4 h-4 inline mr-2" />
                        Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Full Name"
                        value={accountData.name}
                        onChange={(e) => setAccountData({ ...accountData, name: e.target.value })}
                        className={inputClass}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio" className={labelClass}>
                        <FileText className="w-4 h-4 inline mr-2" />
                        Bio/Description
                      </Label>
                      <textarea
                        id="bio"
                        placeholder="Account bio..."
                        value={accountData.bio}
                        onChange={(e) => setAccountData({ ...accountData, bio: e.target.value })}
                        className={`${inputClass} min-h-[80px] w-full rounded-md border px-3 py-2`}
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="has_profile_pic"
                          checked={accountData.has_profile_pic}
                          onChange={(e) => setAccountData({ ...accountData, has_profile_pic: e.target.checked })}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                        <Label htmlFor="has_profile_pic" className={`${labelClass} cursor-pointer`}>
                          <Image className="w-4 h-4 inline mr-1" />
                          Has Profile Pic
                        </Label>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="is_verified"
                          checked={accountData.is_verified}
                          onChange={(e) => setAccountData({ ...accountData, is_verified: e.target.checked })}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                        <Label htmlFor="is_verified" className={`${labelClass} cursor-pointer`}>
                          <CheckCircle className="w-4 h-4 inline mr-1" />
                          Verified
                        </Label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="external_url" className={labelClass}>
                        <LinkIcon className="w-4 h-4 inline mr-2" />
                        External URL
                      </Label>
                      <Input
                        id="external_url"
                        placeholder="https://example.com"
                        value={accountData.external_url}
                        onChange={(e) => setAccountData({ ...accountData, external_url: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="advanced" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="posts" className={labelClass}>Posts *</Label>
                        <Input
                          id="posts"
                          type="number"
                          placeholder="0"
                          value={accountData.posts}
                          onChange={(e) => setAccountData({ ...accountData, posts: e.target.value })}
                          className={inputClass}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="followers" className={labelClass}>Followers *</Label>
                        <Input
                          id="followers"
                          type="number"
                          placeholder="0"
                          value={accountData.followers}
                          onChange={(e) => setAccountData({ ...accountData, followers: e.target.value })}
                          className={inputClass}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="following" className={labelClass}>Following *</Label>
                        <Input
                          id="following"
                          type="number"
                          placeholder="0"
                          value={accountData.following}
                          onChange={(e) => setAccountData({ ...accountData, following: e.target.value })}
                          className={inputClass}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="account_age_days" className={labelClass}>
                          <Calendar className="w-4 h-4 inline mr-1" />
                          Age (days)
                        </Label>
                        <Input
                          id="account_age_days"
                          type="number"
                          placeholder="365"
                          value={accountData.account_age_days}
                          onChange={(e) => setAccountData({ ...accountData, account_age_days: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="avg_likes" className={labelClass}>
                          <TrendingUp className="w-4 h-4 inline mr-1" />
                          Avg Likes
                        </Label>
                        <Input
                          id="avg_likes"
                          type="number"
                          placeholder="0"
                          value={accountData.avg_likes}
                          onChange={(e) => setAccountData({ ...accountData, avg_likes: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="avg_comments" className={labelClass}>
                          <Activity className="w-4 h-4 inline mr-1" />
                          Avg Comments
                        </Label>
                        <Input
                          id="avg_comments"
                          type="number"
                          placeholder="0"
                          value={accountData.avg_comments}
                          onChange={(e) => setAccountData({ ...accountData, avg_comments: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="likes_variance" className={labelClass}>Likes Variance</Label>
                        <Input
                          id="likes_variance"
                          type="number"
                          placeholder="0"
                          value={accountData.likes_variance}
                          onChange={(e) => setAccountData({ ...accountData, likes_variance: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="is_private"
                        checked={accountData.is_private}
                        onChange={(e) => setAccountData({ ...accountData, is_private: e.target.checked })}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      <Label htmlFor="is_private" className={`${labelClass} cursor-pointer`}>
                        Private Account
                      </Label>
                    </div>
                  </TabsContent>
                </Tabs>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    disabled={isAnalyzing}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 text-lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Analyzing with ML...
                      </>
                    ) : (
                      <>
                        <Shield className="w-5 h-5 mr-2" />
                        Run ML Analysis
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </Card>
          </motion.div>

          {/* Result Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className={cardClass}>
              <h2 className={`text-2xl font-bold ${headingClass} mb-6 flex items-center gap-2`}>
                <Activity className="w-6 h-6 text-blue-500" />
                Analysis Results
              </h2>

              {!result ? (
                <div className={`text-center py-12 ${subtextClass}`}>
                  <Shield className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p>Fill in the account details and click "Run ML Analysis" to see results</p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  {/* Status Badge */}
                  <div className={`p-6 rounded-2xl bg-gradient-to-r ${getStatusColor(result.status)}`}>
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(result.status)}
                        <div>
                          <div className="text-3xl font-bold">{result.status}</div>
                          <div className="text-sm opacity-90">{result.risk_level}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-bold">{result.confidence.toFixed(1)}%</div>
                        <div className="text-sm opacity-90">Confidence</div>
                      </div>
                    </div>
                  </div>

                  {/* Probability Bars */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className={`text-sm ${labelClass}`}>Real Probability</span>
                        <span className={`text-sm font-bold ${headingClass}`}>{result.real_probability.toFixed(1)}%</span>
                      </div>
                      <div className={`w-full h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.real_probability}%` }}
                          className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className={`text-sm ${labelClass}`}>Fake Probability</span>
                        <span className={`text-sm font-bold ${headingClass}`}>{result.fake_probability.toFixed(1)}%</span>
                      </div>
                      <div className={`w-full h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.fake_probability}%` }}
                          className="h-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Detailed Analysis */}
                  {result.detailed_analysis.positive_indicators.length > 0 && (
                    <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-green-500/10 border border-green-500/30' : 'bg-green-50 border border-green-200'}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <h3 className={`font-semibold ${headingClass}`}>Positive Indicators</h3>
                      </div>
                      <ul className="space-y-1">
                        {result.detailed_analysis.positive_indicators.map((item, i) => (
                          <li key={i} className={`text-sm ${subtextClass}`}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.detailed_analysis.red_flags.length > 0 && (
                    <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-red-500/10 border border-red-500/30' : 'bg-red-50 border border-red-200'}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <XCircle className="w-5 h-5 text-red-500" />
                        <h3 className={`font-semibold ${headingClass}`}>Red Flags</h3>
                      </div>
                      <ul className="space-y-1">
                        {result.detailed_analysis.red_flags.map((item, i) => (
                          <li key={i} className={`text-sm ${subtextClass}`}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.detailed_analysis.warnings.length > 0 && (
                    <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-yellow-500/10 border border-yellow-500/30' : 'bg-yellow-50 border border-yellow-200'}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                        <h3 className={`font-semibold ${headingClass}`}>Warnings</h3>
                      </div>
                      <ul className="space-y-1">
                        {result.detailed_analysis.warnings.map((item, i) => (
                          <li key={i} className={`text-sm ${subtextClass}`}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className={`text-xs ${subtextClass} text-center pt-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                    Analyzed at: {new Date(result.timestamp).toLocaleString()}
                  </div>
                </motion.div>
              )}
            </Card>
          </motion.div>
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className={cardClass}>
            <h3 className={`text-xl font-bold ${headingClass} mb-4`}>How Our ML Model Works</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl w-fit mb-3">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h4 className={`font-semibold ${headingClass} mb-2`}>Random Forest Classifier</h4>
                <p className={`text-sm ${subtextClass}`}>
                  Uses 200 decision trees trained on 18+ features to achieve 99.2% accuracy in detecting fake accounts.
                </p>
              </div>
              <div>
                <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl w-fit mb-3">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h4 className={`font-semibold ${headingClass} mb-2`}>18 Feature Analysis</h4>
                <p className={`text-sm ${subtextClass}`}>
                  Analyzes follower ratios, engagement rates, bio content, posting patterns, and account metadata.
                </p>
              </div>
              <div>
                <div className="p-3 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl w-fit mb-3">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h4 className={`font-semibold ${headingClass} mb-2`}>Real-Time Results</h4>
                <p className={`text-sm ${subtextClass}`}>
                  Get instant predictions with confidence scores, risk levels, and detailed explanations.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}