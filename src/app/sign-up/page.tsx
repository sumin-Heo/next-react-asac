import React from 'react';
import { ModalProvider } from '../ModalContext';
import App from './App';

function Page() {
  return (
    <ModalProvider>
      <App />
    </ModalProvider>
  );
}

export default Page;
