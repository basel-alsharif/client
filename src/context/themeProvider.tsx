import React, { useCallback, useMemo, useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import { AppContextProps } from './types';
import { theme, darkTheme } from '../theme/theme';
import ThemeContext from './themeContext';

const CheckThemeProvider: React.FC<AppContextProps> = ({ children }) => {
  const initialThemeMode = localStorage.getItem('themeMode') || 'light';
  const [themeMode, setThemeMode] = React.useState(initialThemeMode);

  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  const handleThemeModeSwitch = useCallback(() => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  const ThemeContextValue = useMemo(
    () => ({ themeMode, handleThemeModeSwitch }),
    [themeMode, handleThemeModeSwitch],
  );

  return (
    <ThemeContext.Provider value={ThemeContextValue}>
      <ThemeProvider theme={themeMode === 'light' ? theme : darkTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default CheckThemeProvider;
