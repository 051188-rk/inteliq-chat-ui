import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#4285f4' },
    secondary: { main: '#34a853' },
    background: { 
      default: '#ffffff',
      paper: '#f8f9fa' 
    },
    text: { 
      primary: '#202124',
      secondary: '#5f6368' 
    }
  },
  typography: {
    fontFamily: "'Bricolage Grotesque', -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        }
      }
    }
  }
});

export default theme;
