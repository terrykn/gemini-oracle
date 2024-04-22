import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9aa2e0',
      light: '#ced1f1',
      dark: '#525784',
    },
    secondary: {
      main: '#f50057',
    },
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
);