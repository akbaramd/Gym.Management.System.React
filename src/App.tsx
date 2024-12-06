import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useSettings } from '@/providers/SettingsProvider';
import { AppRouting } from '@/routing';
import { PathnameProvider } from '@/providers';
import { Toaster } from '@/components/ui/sonner';
import store from './store';

const { BASE_URL } = import.meta.env;

const App = () => {
  const { settings } = useSettings();

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add(settings.themeMode);
  }, [settings]);

  return (
    <Provider store={store}>
      <BrowserRouter
        basename={BASE_URL}
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true
        }}
      >
        <PathnameProvider>
          <AppRouting />
        </PathnameProvider>
        <Toaster />
      </BrowserRouter>
    </Provider>
  );
};

export { App };
