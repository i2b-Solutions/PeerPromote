// Import React and ReactDOM
import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";

// Import the main component for your routes
import RoutesComponent from "./ui/flows/routes/router";
import { AppMuiTheme } from "@theme/muiTheme";
import i18n from "./languages/i18n";
import { I18nextProvider } from "react-i18next";
import InitializeServices from "@ui/helpers/initializers";
import AppLanguageModal from "@components/appLanguageModal/appLanguageModal";

// Wrap i18n
const AppWithI18n = () => {
  return (
    <I18nextProvider i18n={i18n}>
      {/* Use the Material-UI ThemeProvider to apply the custom theme */}
      <ThemeProvider theme={AppMuiTheme}>
        {/* Apply global CSS baseline for consistent styling */}
        <CssBaseline />
        <InitializeServices />
        <AppLanguageModal />
        {/* Render the main component for your application routes */}
        <RoutesComponent />
      </ThemeProvider>
    </I18nextProvider>
  );
};

// Use ReactDOM.createRoot to create a root for rendering
const root = ReactDOM.createRoot(
  // Get the HTML element with the id 'root' from the document
  document.getElementById("root") as HTMLElement
);

// Render the main application within a React.StrictMode
root.render(
  <React.StrictMode>
    <AppWithI18n />
  </React.StrictMode>
);
