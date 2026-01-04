import React from 'react';
import ReactDOM from 'react-dom/client';
import { Global } from '@emotion/react';

import App from './App.tsx';
import { globalStyles } from './styles.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <App />
  </React.StrictMode>
);
