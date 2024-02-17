import { createTheme } from "@mui/material";
import { Colors } from "./colors";

// Create a Material-UI theme with Poppins as the default font family
export const AppMuiTheme = createTheme({
  typography: {
    allVariants: {
      color: Colors.main.darkBlue,
    },
    h1: { fontFamily: 'Poppins, sans-serif' },
    h2: { fontFamily: 'Poppins, sans-serif' },
    h3: { fontFamily: 'Poppins, sans-serif' },
    h4: { fontFamily: 'Poppins, sans-serif' },
    h5: { fontFamily: 'Poppins, sans-serif' },
    h6: { fontFamily: 'Poppins, sans-serif' },
    body1: { fontFamily: '"Poppins", sans-serif', fontSize: '1rem' },
    body2: { fontFamily: '"Poppins", sans-serif', fontSize: '0.9rem' },
    caption: { fontFamily: '"Poppins", sans-serif' },
    button: { fontFamily: 'Poppins, sans-serif', fontSize: '1rem' },
    subtitle1: { fontFamily: '"Poppins", sans-serif' },
    subtitle2: { fontFamily: '"Poppins", sans-serif' },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: Colors.main.mediumGrey,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: Colors.main.blue,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: Colors.main.blue,
          },
        },
      },
    },
  },
});