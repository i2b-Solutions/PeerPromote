import React from 'react';
import ReactDOM from 'react-dom/client';
import RoutesComponent from './ui/flows/routes/router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RoutesComponent />
  </React.StrictMode>
);
