import React from 'react';
import ReactDOM from 'react-dom';
import './styles/App.css';
import App from './App';
import { AccessLevelProvider } from './contexts/AccessLevelContext';

ReactDOM.render(
  <React.StrictMode>
    <AccessLevelProvider>
      <App />
    </AccessLevelProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
