import React, { createContext, useContext, useState, useEffect } from 'react';

interface CalmModeContextType {
  isCalmMode: boolean;
  toggleCalmMode: () => void;
  setCalmMode: (value: boolean) => void;
}

const CalmModeContext = createContext<CalmModeContextType | undefined>(undefined);

export const CalmModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCalmMode, setIsCalmModeState] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cyberrakshak_calm_mode') === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (isCalmMode) {
      document.documentElement.classList.add('calm-mode');
      document.body.classList.add('calm-mode');
    } else {
      document.documentElement.classList.remove('calm-mode');
      document.body.classList.remove('calm-mode');
    }
    try {
      localStorage.setItem('cyberrakshak_calm_mode', String(isCalmMode));
    } catch {
      // Storage access resilience
    }
  }, [isCalmMode]);

  const toggleCalmMode = () => {
    setIsCalmModeState((prev) => !prev);
  };

  const setCalmMode = (value: boolean) => {
    setIsCalmModeState(value);
  };

  return (
    <CalmModeContext.Provider value={{ isCalmMode, toggleCalmMode, setCalmMode }}>
      {children}
    </CalmModeContext.Provider>
  );
};

export function useCalmMode(): CalmModeContextType {
  const context = useContext(CalmModeContext);
  if (!context) {
    throw new Error('useCalmMode must be used within a CalmModeProvider');
  }
  return context;
}
