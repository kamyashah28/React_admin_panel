import './App.css';
import { Router } from './routes/sections';
import { useScrollToTop } from './hooks/use-scroll-to-top';
import { ThemeProvider } from './theme/theme-provider';
import './locales/i18n';
import i18n from './locales/i18n';
import { Button, Box } from '@mui/material'; // Import MUI components

export default function App() {
  useScrollToTop();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <ThemeProvider>
      <Router />
      <Box
        sx={{
          bottom: 0,
          left: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'right',
          padding: 2,
          zIndex: 1000,
          backgroundColor: 'white',
        }}
      >
        <Button onClick={() => changeLanguage('en')} variant="outlined">
          English
        </Button>
        <Button onClick={() => changeLanguage('fr')} variant="outlined" sx={{ ml: 2 }}>
          Français
        </Button>
      </Box>
    </ThemeProvider>
  );
}
