import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import { ClipLoader } from 'react-spinners';

const root = createRoot(document.getElementById('root'));

function AppWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <ClipLoader />;
  }

  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />} />
          <Route path="/*" element={isLoggedIn ? <App /> : <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}

root.render(<AppWrapper />);