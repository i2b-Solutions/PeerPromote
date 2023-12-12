// Import React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

// Import the main component for your routes
import RoutesComponent from './ui/flows/routes/router';
import { AppMuiTheme } from '@theme/muiTheme';

// Use ReactDOM.createRoot to create a root for rendering
const root = ReactDOM.createRoot(
  // Get the HTML element with the id 'root' from the document
  document.getElementById('root') as HTMLElement

);

// Render the main application within a React.StrictMode
root.render(
  <React.StrictMode>
    {/* Use the Material-UI ThemeProvider to apply the custom theme */}
    <ThemeProvider theme={AppMuiTheme}>
      {/* Apply global CSS baseline for consistent styling */}
      <CssBaseline />

      {/* Render the main component for your application routes */}
      <RoutesComponent />
    </ThemeProvider>
  </React.StrictMode>
);
