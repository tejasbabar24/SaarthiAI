import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultCitizen } from '../data/citizens';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [citizen, setCitizen] = useState(() => {
    try {
      const saved = localStorage.getItem('sarthi_citizen');
      return saved ? JSON.parse(saved) : defaultCitizen;
    } catch { return defaultCitizen; }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('sarthi_logged_in') === 'true';
  });

  const [language, setLanguage] = useState('en');
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem('sarthi_citizen', JSON.stringify(citizen));
  }, [citizen]);

  const login = (data) => {
    setIsLoggedIn(true);
    localStorage.setItem('sarthi_logged_in', 'true');
    if (data) setCitizen(prev => ({ ...prev, ...data }));
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('sarthi_logged_in');
  };

  const updateCitizen = (data) => {
    setCitizen(prev => ({ ...prev, ...data }));
  };

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <AppContext.Provider value={{
      citizen,
      setCitizen,
      updateCitizen,
      isLoggedIn,
      login,
      logout,
      language,
      setLanguage,
      toasts,
      addToast,
      removeToast,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
