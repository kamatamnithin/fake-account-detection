import { motion } from 'motion/react';
import { User, Mail, Lock, Bell, Shield, Trash2, Save } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Switch } from '@/app/components/ui/switch';
import { Separator } from '@/app/components/ui/separator';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';
import { useTheme } from '@/app/App';

export function ProfilePage() {
  const { theme } = useTheme();
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    username: 'johndoe123',
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: true,
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save
    console.log('Profile saved:', profile);
  };

  const headingClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const subheadingClass = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const cardClass = theme === 'dark'
    ? 'p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 backdrop-blur-sm'
    : 'p-6 bg-gradient-to-br from-white/60 to-blue-50/80 border-blue-200/50 shadow-lg backdrop-blur-sm';
  const inputClass = theme === 'dark'
    ? 'bg-gray-800 border-gray-700 text-white'
    : 'bg-white/70 border-blue-200 text-gray-900';
  const labelClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const buttonOutlineClass = theme === 'dark'
    ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700'
    : 'bg-gray-100 border-gray-300 text-gray-900 hover:bg-gray-200';
  const separatorClass = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300';

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className={`text-4xl font-bold ${headingClass} mb-2`}>Profile Settings</h1>
          <p className={subheadingClass}>Manage your account settings and preferences</p>
        </motion.div>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className={cardClass}>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <h2 className={`text-2xl font-bold ${headingClass}`}>Personal Information</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="w-32 h-32">
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-3xl">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  className={buttonOutlineClass}
                >
                  Change Photo
                </Button>
              </div>

              <form onSubmit={handleSaveProfile} className="flex-1 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className={labelClass}>
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username" className={labelClass}>
                    Username
                  </Label>
                  <Input
                    id="username"
                    value={profile.username}
                    onChange={(e) =>
                      setProfile({ ...profile, username: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className={labelClass}>
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className={buttonOutlineClass}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </motion.div>

        {/* Security Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className={cardClass}>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h2 className={`text-2xl font-bold ${headingClass}`}>Security</h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className={`font-semibold ${headingClass}`}>Two-Factor Authentication</p>
                  <p className={`text-sm ${subheadingClass}`}>
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch
                  checked={security.twoFactor}
                  onCheckedChange={(checked) =>
                    setSecurity({ ...security, twoFactor: checked })
                  }
                />
              </div>

              <Separator className={separatorClass} />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className={`font-semibold ${headingClass}`}>Auto Session Timeout</p>
                  <p className={`text-sm ${subheadingClass}`}>
                    Automatically log out after 30 minutes of inactivity
                  </p>
                </div>
                <Switch
                  checked={security.sessionTimeout}
                  onCheckedChange={(checked) =>
                    setSecurity({ ...security, sessionTimeout: checked })
                  }
                />
              </div>

              <Separator className={separatorClass} />

              <div>
                <Button
                  className={buttonOutlineClass}
                  variant="outline"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Notifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className={cardClass}>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <h2 className={`text-2xl font-bold ${headingClass}`}>Notifications</h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className={`font-semibold ${headingClass}`}>Email Notifications</p>
                  <p className={`text-sm ${subheadingClass}`}>
                    Receive email alerts for important updates
                  </p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, email: checked })
                  }
                />
              </div>

              <Separator className={separatorClass} />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className={`font-semibold ${headingClass}`}>Push Notifications</p>
                  <p className={`text-sm ${subheadingClass}`}>
                    Get push notifications on your device
                  </p>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, push: checked })
                  }
                />
              </div>

              <Separator className={separatorClass} />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className={`font-semibold ${headingClass}`}>Weekly Summary</p>
                  <p className={`text-sm ${subheadingClass}`}>
                    Receive a weekly summary of your activity
                  </p>
                </div>
                <Switch
                  checked={notifications.weekly}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, weekly: checked })
                  }
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 bg-gradient-to-br from-red-900/20 to-pink-900/20 border-red-700/50 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-gradient-to-br from-red-600 to-pink-600 rounded-lg">
                <Trash2 className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Danger Zone</h2>
            </div>

            <div className="space-y-4">
              <p className={subheadingClass}>
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <Button
                variant="destructive"
                className="bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}