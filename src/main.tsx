import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { PlatformProvider } from './PlatformContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <PlatformProvider>
    <App />
  </PlatformProvider>
);
