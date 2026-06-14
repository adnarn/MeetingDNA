// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MeetingDetail from './pages/MeetingDetail';
import Emails from './pages/Emails';
import History from './pages/History';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import './App.css'
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/meeting/:id" element={<MeetingDetail />} />
            <Route path="/meeting/:id/emails" element={<Emails />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;