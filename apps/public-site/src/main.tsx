import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import './styles.css'; // 👈 AGGIUNGI QUESTA RIGA (Assicurati che il file sia in src/styles.css)
import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <BrowserRouter
      future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  }}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);