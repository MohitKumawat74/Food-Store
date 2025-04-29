import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom"; // ✅ Add this

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>  {/* ✅ Wrap App with Router here */}
      <App />
      <Toaster position="top-right" reverseOrder={false} />
    </BrowserRouter>
  </StrictMode>
);
