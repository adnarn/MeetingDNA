import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { useEffect } from 'react';

// Component to handle Zoom redirect
const ZoomHandler = () => {
  const { refreshUser } = useAuth();
  
  useEffect(() => {
    const handleZoomRedirect = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get('token');
      const zoomConnected = queryParams.get('zoom');
      
      if (token) {
        // Save token to localStorage
        localStorage.setItem('token', token);
        // Refresh user data
        await refreshUser();
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
        window.location.reload();
      }
      
      if (zoomConnected === 'connected') {
        console.log('Zoom connected successfully!');
        // Refresh user data to update Zoom status
        await refreshUser();
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    };
    
    handleZoomRedirect();
  }, [refreshUser]);
  
  return null;
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <ZoomHandler />
            <Navbar />
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              
              {/* Protected routes */}
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