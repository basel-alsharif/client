import { ReactElement, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import router from './routes/index.tsx';
import { AuthContext, ThemeProvider } from './context';
import './index.css';

const App = (): ReactElement => {
  useEffect(() => {
    const handleOnline = () => {
      enqueueSnackbar('You are back online', { variant: 'success' });
    };

    const handleOffline = () => {
      enqueueSnackbar('You are offline', { variant: 'warning' });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <ThemeProvider>
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <AuthContext>
          <RouterProvider router={router} />
        </AuthContext>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
