import React from 'react';
import { useModal } from '../ModalContext';

function CustomModal() {
  const { modalState, dispatch } = useModal();

  if (!modalState.isOpen) {
    return null;
  }

  const handleConfirm = () => {
    modalState.onConfirm && modalState.onConfirm();
    dispatch({ type: 'CLOSE_MODAL' });
  };

  const handleCancel = () => {
    modalState.onCancel && modalState.onCancel();
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return (
    <div className="modal">
      <h2>{modalState.title}</h2>
      <p>{modalState.content}</p>
      <button onClick={handleConfirm}>확인</button>
      <button onClick={handleCancel}>취소</button>
    </div>
  );
}

export default CustomModal;
