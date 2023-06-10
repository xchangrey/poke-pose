import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { SWRConfig } from 'swr';
import './index.css'

const config = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  throwOnError: false,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SWRConfig value={config}>
      <App />
    </SWRConfig>
  </React.StrictMode>
);