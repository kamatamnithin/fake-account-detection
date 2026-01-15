import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Analysis } from './pages/Analysis';
import { AIChat } from './pages/AIChat';
import { Prediction } from './pages/Prediction';
import { About } from './pages/About';
import { WhatIfScenarios } from './pages/WhatIfScenarios';
import { Review } from './pages/Review';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Toaster } from './components/Toaster';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import { PredictionProvider } from '../contexts/PredictionContext';

function AppContent() {
  const { isDarkMode } = useTheme();
  
  return (
    <Router>
      <div className={`min-h-screen transition-colors ${
        isDarkMode
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
          : 'bg-white'
      }`}>
        <Toaster />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/analysis" element={<ProtectedRoute><Analysis /></ProtectedRoute>} />
          <Route path="/ai-chat" element={<ProtectedRoute><AIChat /></ProtectedRoute>} />
          <Route path="/prediction" element={<ProtectedRoute><Prediction /></ProtectedRoute>} />
          <Route path="/scenarios" element={<ProtectedRoute><WhatIfScenarios /></ProtectedRoute>} />
          <Route path="/review" element={<ProtectedRoute><Review /></ProtectedRoute>} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <PredictionProvider>
          <AppContent />
        </PredictionProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}