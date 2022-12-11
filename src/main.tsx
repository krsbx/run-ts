import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import './styles/index.css';
import AppContextProvider from './context/AppContext';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const rootEl = document.getElementById('root')! as HTMLElement;

ReactDOM.createRoot(rootEl).render(
  <ChakraProvider>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </ChakraProvider>
);
