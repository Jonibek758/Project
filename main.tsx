import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';  // 'App' ni import qilish
import './index.css';  // CSS faylini import qilish

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />  {/* Faqat App komponentini render qiling, Router ichida emas */}
  </React.StrictMode>
);
