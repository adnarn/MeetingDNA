import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MeetingDetail from './pages/MeetingDetail';
import Emails from './pages/Emails';
import History from './pages/History';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import { useEffect, useState } from 'react';
import './App.css'

// Component to handle Zoom redirect
const ZoomHandler = () => {
  const { refreshUser, user } = useAuth();
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    const handleZoomRedirect = async () => {
      if (processed) return;
      
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get('token');
      const zoomConnected = queryParams.get('zoom');
      const error = queryParams.get('error');
      
      if (error) {
        toast.error('Failed to connect Zoom. Please try again.');
        setProcessed(true);
        return;
      }
      
      if (token) {
        // Save token to localStorage
        localStorage.setItem('token', token);
        // Refresh user data
        await refreshUser();
        // Show success toast
        toast.success('🎉 Zoom connected successfully!');
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
        setProcessed(true);
        // Force reload to update UI
        window.location.reload();
      }
      
      if (zoomConnected === 'connected' && !token) {
        // Refresh user data
        await refreshUser();
        // Show success toast
        toast.success('🎉 Zoom connected successfully!');
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
        setProcessed(true);
        // Force reload to update UI
        window.location.reload();
      }
    };
    
    handleZoomRedirect();
  }, [refreshUser, processed]);

  // Also check for token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      refreshUser();
    }
  }, [refreshUser]);

  return null;
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 4000,
                  style: {
                    background: '#10B981',
                    color: '#fff',
                  },
                },
                error: {
                  duration: 4000,
                  style: {
                    background: '#EF4444',
                    color: '#fff',
                  },
                },
              }}
            />
            <ZoomHandler />
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />
              <Route path="/meeting/:id" element={
                <ProtectedRoute>
                  <MeetingDetail />
                </ProtectedRoute>
              } />
              <Route path="/meeting/:id/emails" element={
                <ProtectedRoute>
                  <Emails />
                </ProtectedRoute>
              } />
              <Route path="/history" element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;