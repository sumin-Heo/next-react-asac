'use client';

import React, { useState, useRef } from 'react';
import Modal from './Modal';
import { useModal } from '../ModalContext';
import '../main.css';

export default function App() {
  const userIdRef = useRef<HTMLInputElement | null>(null);
  const passwordFormRef = useRef<HTMLInputElement | null>(null);
  const rePasswordFormRef = useRef<HTMLInputElement | null>(null);
  const { dispatch } = useModal();
  const [showModal, setShowModal] = useState(false);

  const [inputs, setInputs] = useState({
    userId: '',
    userPW: '',
    re_password: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const nextInputs = { ...inputs, [name]: value };
    setInputs(nextInputs);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (
      userIdRef.current &&
      passwordFormRef.current &&
      rePasswordFormRef.current
    ) {
      const userId = userIdRef.current.value;
      const userPW = passwordFormRef.current.value;
      const re_password = rePasswordFormRef.current.value;

      if (!userId.includes('@')) {
        userIdRef.current.focus();
        return;
      }

      const passwordRegExp =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      if (!passwordRegExp.test(userPW)) {
        passwordFormRef.current.focus();
        return;
      }
      if (userPW !== re_password) {
        rePasswordFormRef.current.focus();
        return;
      }

      console.log('회원가입 성공');
    }
  };

  const openModal = () => {
    dispatch({
      type: 'OPEN_MODAL',
      payload: {
        title: '제약 안내',
        content: '패스워드는 8자 이상이어야 합니다.',
      },
    });
    setShowModal(true);
  };

  return (
    <div>
      <form>
        <div>
          <h1>회원가입</h1>
          <button onClick={openModal}>모달 열기</button>
          {showModal && <Modal />}
          <label>아이디(메일)</label>
          <input
            type="text"
            name="userId"
            id="userId"
            ref={userIdRef}
            onChange={onChange}
          />
        </div>
        <div>
          <label>패스워드</label>
          <input
            type="password"
            name="userPW"
            id="userPW"
            ref={passwordFormRef}
            onChange={onChange}
          />
        </div>
        <div>
          <label>패스워드 확인</label>
          <input
            type="password"
            name="re_password"
            id="re_password"
            ref={rePasswordFormRef}
            onChange={onChange}
          />
        </div>
        <div>
          <button onClick={handleSubmit}>회원가입</button> {/* 오타 수정 */}
        </div>
      </form>
    </div>
  );
}
