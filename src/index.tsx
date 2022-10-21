import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

import reportWebVitals from './reportWebVitals';

import router from './router';
import { TrailerProvider } from './components/Trailer/TrailerContext';
import { AlertsProvider } from './components/Alert/AlertContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <TrailerProvider>
      <AlertsProvider>
        <CssBaseline />
        <RouterProvider router={router} />
      </AlertsProvider>
    </TrailerProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
