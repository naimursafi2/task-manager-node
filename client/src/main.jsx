import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { apiService } from './services/api.js';

createRoot(document.getElementById('root')).render(
  <ApiProvider api = {apiService}>
    <App />
  </ApiProvider>,
)
