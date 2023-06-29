import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/main.scss';

const rootContainer = document.getElementById('root');
const root = createRoot(rootContainer);

root.render(<App />);
