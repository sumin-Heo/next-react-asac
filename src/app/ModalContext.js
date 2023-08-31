'use client';

import { createContext, useContext, useReducer } from 'react';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const initialState = {
    isOpen: false,
    title: '',
    content: '',
    onConfirm: null,
    onCancel: null,
  };

  function modalReducer(state, action) {
    switch (action.type) {
      case 'OPEN_MODAL':
        return { ...state, ...action.payload, isOpen: true };
      case 'CLOSE_MODAL':
        return { ...initialState };
      default:
        return state;
    }
  }

  const [modalState, dispatch] = useReducer(modalReducer, initialState);

  return (
    <ModalContext.Provider value={{ modalState, dispatch }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
