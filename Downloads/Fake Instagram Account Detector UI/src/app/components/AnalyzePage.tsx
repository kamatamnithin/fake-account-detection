import { motion } from 'motion/react';
import { Search, Shield, AlertTriangle, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { useTheme } from '@/app/App';
import { projectId, publicAnonKey } from '/utils/supabase/info';

export function AnalyzePage() {
  const { theme } = useTheme();
  const [accountData, setAccountData] = useState({
    username: '',
    followers: '',
    following: '',
    posts: '',
    accountAge: '',
  });

  const [result, setResult] = useState<{
    status: 'real' | 'fake' | 'suspicious' | null;
    score: number;
    details?: string;
  }>({ status: null, score: 0 });

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);

    try {
      // Call backend ML prediction endpoint
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-828f33b3/analyze`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            username: accountData.username,
            followers: parseInt(accountData.followers) || 0,
            following: parseInt(accountData.following) || 0,
            posts: parseInt(accountData.posts) || 0,
            accountAge: parseInt(accountData.accountAge) || 0,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Analysis error:', error);
      // Fallback to client-side analysis if backend fails
      performClientAnalysis();
    } finally {
      setIsAnalyzing(false);
    }
  };

  const performClientAnalysis = () => {
    const followers = parseInt(accountData.followers) || 0;
    const following = parseInt(accountData.following) || 0;
    const posts = parseInt(accountData.posts) || 0;
    const age = parseInt(accountData.accountAge) || 0;

    const ratio = following > 0 ? followers / following : 0;
    const postsPerMonth = age > 0 ? posts / age : 0;

    let score = 50;
    let details = '';
    
    if (ratio > 1) { score += 15; details += 'Good follower/following ratio. '; }
    if (ratio < 0.1) { score -= 20; details += 'Low follower/following ratio. '; }
    if (posts > 50) { score += 10; details += 'Active posting history. '; }
    if (postsPerMonth < 1) { score -= 15; details += 'Low posting frequency. '; }
    if (age < 3) { score -= 10; details += 'New account. '; }
    if (followers > 1000) { score += 10; details += 'Established following. '; }

    let status: 'real' | 'fake' | 'suspicious';
    if (score >= 70) status = 'real';
    else if (score >= 40) status = 'suspicious';
    else status = 'fake';

    setResult({ 
      status, 
      score: Math.max(0, Math.min(100, score)),
      details
    });
  };

  const getStatusColor = (status: string) => {
    if (status === 'real') return theme === 'dark' ? 'text-green-500 bg-green-500/20' : 'text-green-600 bg-green-100';
    if (status === 'fake') return theme === 'dark' ? 'text-red-500 bg-red-500/20' : 'text-red-600 bg-red-100';
    return theme === 'dark' ? 'text-yellow-500 bg-yellow-500/20' : 'text-yellow-600 bg-yellow-100';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'real') return <CheckCircle className="w-5 h-5" />;
    if (status === 'fake') return <XCircle className="w-5 h-5" />;
    return <AlertTriangle className="w-5 h-5" />;
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
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-block p-4 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-2xl mb-4">
            <Shield className="w-12 h-12 text-blue-500" />
          </div>
          <h1 className={`text-4xl font-bold ${headingClass} mb-2`}>Analyze Instagram Account</h1>
          <p className={subtextClass}>
            Enter account details to detect fake or suspicious accounts using AI
          </p>
        </motion.div>

        {/* Analysis Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className={cardClass}>
            <form onSubmit={handleAnalyze} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className={labelClass}>
                    Username
                  </Label>
                  <Input
                    id="username"
                    placeholder="@username"
                    value={accountData.username}
                    onChange={(e) =>
                      setAccountData({ ...accountData, username: e.target.value })
                    }
                    className={inputClass}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="followers" className={labelClass}>
                    Followers
                  </Label>
                  <Input
                    id="followers"
                    type="number"
                    placeholder="0"
                    value={accountData.followers}
                    onChange={(e) =>
                      setAccountData({ ...accountData, followers: e.target.value })
                    }
                    className={inputClass}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="following" className={labelClass}>
                    Following
                  </Label>
                  <Input
                    id="following"
                    type="number"
                    placeholder="0"
                    value={accountData.following}
                    onChange={(e) =>
                      setAccountData({ ...accountData, following: e.target.value })
                    }
                    className={inputClass}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="posts" className={labelClass}>
                    Posts
                  </Label>
                  <Input
                    id="posts"
                    type="number"
                    placeholder="0"
                    value={accountData.posts}
                    onChange={(e) =>
                      setAccountData({ ...accountData, posts: e.target.value })
                    }
                    className={inputClass}
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="accountAge" className={labelClass}>
                    Account Age (months)
                  </Label>
                  <Input
                    id="accountAge"
                    type="number"
                    placeholder="0"
                    value={accountData.accountAge}
                    onChange={(e) =>
                      setAccountData({ ...accountData, accountAge: e.target.value })
                    }
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={isAnalyzing}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 text-lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Analyze Account
                    </>
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Result */}
            {result.status && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`mt-6 p-6 rounded-xl border ${
                  theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${getStatusColor(result.status)}`}>
                      {getStatusIcon(result.status)}
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${headingClass} capitalize`}>
                        {result.status} Account
                      </h3>
                      <p className={`text-sm ${subtextClass}`}>Confidence Score</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${headingClass}`}>
                      {result.score}%
                    </div>
                  </div>
                </div>
                
                <div className={`w-full rounded-full h-3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.score}%` }}
                    className={`h-3 rounded-full ${
                      result.status === 'real'
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600'
                        : result.status === 'fake'
                        ? 'bg-gradient-to-r from-red-600 to-pink-600'
                        : 'bg-gradient-to-r from-yellow-600 to-orange-600'
                    }`}
                  />
                </div>

                {result.details && (
                  <div className={`mt-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-white'}`}>
                    <p className={`text-sm ${subtextClass}`}>
                      <span className="font-semibold">Analysis Details:</span> {result.details}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}