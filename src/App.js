import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Typography, Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';

import Header from './components/Header';
import CoinsTable from './components/CoinsTable';
import CoinInfo from './components/CoinInfo';
import TrendingCarousel from './components/TrendingCarousel';
import CryptoContextProvider from './CryptoContext';

const modernTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { 
      main: '#6366f1',
      light: '#818cf8',
      dark: '#4f46e5',
    },
    secondary: {
      main: '#06b6d4',
      light: '#67e8f9',
      dark: '#0891b2',
    },
    background: {
      default: '#0a0a0a',
      paper: 'rgba(15, 23, 42, 0.8)',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
    },
  },
  typography: {
    fontFamily: '"Inter", "Space Grotesk", system-ui, sans-serif',
    h1: {
      fontFamily: '"Space Grotesk", system-ui, sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Space Grotesk", system-ui, sans-serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Space Grotesk", system-ui, sans-serif',
      fontWeight: 600,
    },
    body1: {
      fontFamily: '"Inter", system-ui, sans-serif',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: '#6366f1 transparent',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'linear-gradient(45deg, #6366f1, #06b6d4)',
            borderRadius: '4px',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <CryptoContextProvider>
        <ThemeProvider theme={modernTheme}>
          <CssBaseline />
          <GlobalStyles
            styles={{
              body: {
                minHeight: '100vh',
                background: `
                  radial-gradient(ellipse at top left, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
                  radial-gradient(ellipse at top right, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
                  radial-gradient(ellipse at bottom left, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
                  linear-gradient(135deg, #0a0a0a 0%, #0f172a 100%)
                `,
                backgroundAttachment: 'fixed',
                position: 'relative',
              },
              '::selection': {
                backgroundColor: 'rgba(99, 102, 241, 0.3)',
                color: '#f8fafc',
              },
              '*': {
                scrollBehavior: 'smooth',
              },
            }}
          />
          <div style={{
            position: 'relative',
            zIndex: 1,
            backdropFilter: 'blur(1px)',
          }}>
            <Header />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <TrendingCarousel />
                    <CoinsTable />
                  </>
                }
              />
              <Route path="/coins/:id" element={<CoinInfo />} />
            </Routes>
            
            {/* Modern Footer */}
            <Box
              component="footer"
              sx={{
                mt: 8,
                py: 4,
                px: 3,
                textAlign: 'center',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(15, 23, 42, 0.3)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 1,
                  background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 700,
                  fontFamily: '"Space Grotesk", sans-serif',
                }}
              >
                CoinWatch
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  mb: 2,
                }}
              >
                Advanced Cryptocurrency Analytics Platform
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                }}
              >
                Built by{' '}
                <Typography
                  component="span"
                  sx={{
                    color: '#f59e0b',
                    fontWeight: 600,
                  }}
                >
                  MUKUL NEGI
                </Typography>
                {' • '}
                <Typography
                  component="a"
                  href="mailto:m@gmail.com"
                  sx={{
                    color: 'secondary.main',
                    textDecoration: 'none',
                    fontWeight: 500,
                    '&:hover': {
                      color: 'secondary.light',
                    },
                  }}
                >
                  nmukul32@gmail.com
                </Typography>
              </Typography>
            </Box>
          </div>
        </ThemeProvider>
      </CryptoContextProvider>
    </BrowserRouter>
  );
}

export default App;
