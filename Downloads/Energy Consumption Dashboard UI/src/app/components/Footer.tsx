import { Zap, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTheme } from '../../contexts/ThemeContext';
import { branding } from '../../config/branding';

export function Footer() {
  const { isDarkMode } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`border-t mt-20 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700' 
        : 'bg-gradient-to-br from-slate-50 via-white to-slate-50 border-slate-200'
    }`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <motion.div
          className={`absolute top-1/2 right-1/4 w-64 h-64 rounded-full blur-3xl ${
            isDarkMode ? 'bg-blue-600/20' : 'bg-blue-400/20'
          }`}
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
              }`}>
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                {branding.company.name}
              </span>
            </div>
            <p className={`mb-4 max-w-sm ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {branding.company.description}
            </p>
            <div className="flex gap-4">
              <motion.a
                href={branding.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-all ${
                  isDarkMode 
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white' 
                    : 'bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href={branding.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-all ${
                  isDarkMode 
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white' 
                    : 'bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href={branding.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-all ${
                  isDarkMode 
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white' 
                    : 'bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href={`mailto:${branding.company.email}`}
                className={`p-2 rounded-lg transition-all ${
                  isDarkMode 
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white' 
                    : 'bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`font-semibold mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {branding.navigation.menuItems.slice(0, 4).map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`transition-colors hover:underline ${
                      isDarkMode 
                        ? 'text-slate-400 hover:text-white' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className={`font-semibold mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Contact
            </h3>
            <ul className="space-y-2">
              <li className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
                {branding.company.email}
              </li>
              <li className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
                {branding.company.phone}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${
          isDarkMode ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
            © {currentYear} {branding.footer.copyrightText}
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className={`transition-colors ${
                isDarkMode 
                  ? 'text-slate-400 hover:text-white' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className={`transition-colors ${
                isDarkMode 
                  ? 'text-slate-400 hover:text-white' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
