'use client';

import { createContext, useContext, useReducer } from 'react';
import { Modal } from '@mui/material';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const initialState = {
    isOpen: false,
    title: '',
    content: '',
    onConfirm: () => {
      console.log('확인 버튼 클릭');
    },
    onCancel: () => {
      console.log('취소 버튼 클릭');
    },
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
      <Modal
        open={modalState.isOpen}
        onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
      >
        <div className="modal">
          <h2>{modalState.title}</h2>
          <p>{modalState.content}</p>
          <button onClick={modalState.onConfirm}>확인</button>
          <button onClick={modalState.onCancel}>취소</button>
        </div>
      </Modal>
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
