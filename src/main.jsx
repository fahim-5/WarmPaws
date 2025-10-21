import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'animate.css';
import './index.css';

AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);