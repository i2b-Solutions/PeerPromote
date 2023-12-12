import { createTheme } from "@mui/material";

// Create a Material-UI theme with Poppins as the default font family
export const AppMuiTheme = createTheme({
    typography: {
      h1: { fontFamily: 'Poppins, sans-serif' },
      h2: { fontFamily: 'Poppins, sans-serif' },
      h3: { fontFamily: 'Poppins, sans-serif' },
      h4: { fontFamily: 'Poppins, sans-serif' },
      h5: { fontFamily: 'Poppins, sans-serif' },
      h6: { fontFamily: 'Poppins, sans-serif' },
      body1: { fontFamily: '"Didact Gothic", sans-serif', fontSize: '1.2rem'},
      body2: { fontFamily: '"Didact Gothic", sans-serif', fontSize: '1rem' },
      caption: { fontFamily: '"Didact Gothic", sans-serif' },
      button: { fontFamily: 'Poppins, sans-serif', fontSize: '1rem' },
      subtitle1: { fontFamily: '"Didact Gothic", sans-serif' },
      subtitle2: { fontFamily: '"Didact Gothic", sans-serif' },
    }
  });