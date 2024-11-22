import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Ensure this line is present
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DrawerProvider } from './contexts/DrawerContext';
import { BrowserRouter as Router } from 'react-router-dom';
import NavigationTracker from './components/NavigationTracker';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <DrawerProvider>
      <Router>
        <NavigationTracker />
        <App />
      </Router>
    </DrawerProvider>
);

reportWebVitals();
