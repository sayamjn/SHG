import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';

// Common Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Navbar from './components/common/Navbar';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Details from './pages/Details';
import Schemes from './pages/Schemes';
import Register from './pages/Register';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  const [highContrast, setHighContrast] = useState(
    localStorage.getItem('highContrast') === 'true' || false
  );
  
  const [fontSize, setFontSize] = useState(
    parseInt(localStorage.getItem('fontSize')) || 16
  );

  // Toggle high contrast mode
  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    localStorage.setItem('highContrast', newValue);
  };

  // Adjust font size
  const adjustFontSize = (adjustment) => {
    // Min size: 14, Max size: 24
    const newSize = Math.min(Math.max(fontSize + adjustment, 14), 24);
    setFontSize(newSize);
    localStorage.setItem('fontSize', newSize);
    document.documentElement.style.fontSize = `${newSize}px`;
  };

  // Reset font size
  const resetFontSize = () => {
    setFontSize(16);
    localStorage.setItem('fontSize', 16);
    document.documentElement.style.fontSize = '16px';
  };

  // Set initial font size
  React.useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    
    // Apply high contrast if enabled
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [fontSize, highContrast]);

  return (
    <AuthProvider>
      <LanguageProvider>
        <div className={`min-h-screen flex flex-col ${highContrast ? 'high-contrast' : ''}`}>
          <Header 
            toggleHighContrast={toggleHighContrast}
            increaseFontSize={() => adjustFontSize(2)}
            decreaseFontSize={() => adjustFontSize(-2)}
            resetFontSize={resetFontSize}
            highContrast={highContrast}
          />
          <Navbar />
          <main className="flex-grow container-custom py-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/details" element={<Details />} />
              <Route path="/schemes" element={<Schemes />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer position="bottom-right" />
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;