import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import './index.css';
import appStore from './app/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={appStore}>
      <App />
    </Provider>
  </StrictMode>
);
