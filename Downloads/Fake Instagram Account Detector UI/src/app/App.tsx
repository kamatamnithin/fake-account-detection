import { useState, createContext, useContext } from 'react';
import { Background3D } from '@/app/components/Background3D';
import { Navbar } from '@/app/components/Navbar';
import { HomePage } from '@/app/components/HomePage';
import { LoginPage } from '@/app/components/LoginPage';
import { SignupPage } from '@/app/components/SignupPage';
import { DashboardPage } from '@/app/components/DashboardPage';
import { ProfilePage } from '@/app/components/ProfilePage';
import { AnalyzePageEnhanced } from '@/app/components/AnalyzePageEnhanced';
import { AboutPage } from '@/app/components/AboutPage';
import { ErrorPage } from '@/app/components/ErrorPage';
import { Toaster } from '@/app/components/ui/sonner';

// Theme Context
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('login');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} onLogin={handleLogin} />;
      case 'signup':
        return <SignupPage onNavigate={setCurrentPage} />;
      case 'home':
        return isAuthenticated ? <HomePage onNavigate={setCurrentPage} /> : <LoginPage onNavigate={setCurrentPage} onLogin={handleLogin} />;
      case 'about':
        return isAuthenticated ? <AboutPage onNavigate={setCurrentPage} /> : <LoginPage onNavigate={setCurrentPage} onLogin={handleLogin} />;
      case 'dashboard':
        return isAuthenticated ? <DashboardPage /> : <LoginPage onNavigate={setCurrentPage} onLogin={handleLogin} />;
      case 'analyze':
        return isAuthenticated ? <AnalyzePageEnhanced /> : <LoginPage onNavigate={setCurrentPage} onLogin={handleLogin} />;
      case 'profile':
        return isAuthenticated ? <ProfilePage /> : <LoginPage onNavigate={setCurrentPage} onLogin={handleLogin} />;
      case 'error':
        return <ErrorPage onNavigate={setCurrentPage} />;
      default:
        return <LoginPage onNavigate={setCurrentPage} onLogin={handleLogin} />;
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'dark' ? 'dark' : ''}>
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
          <Background3D />
          <Navbar 
            onNavigate={setCurrentPage} 
            currentPage={currentPage}
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
          />
          {renderPage()}
          <Toaster />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}