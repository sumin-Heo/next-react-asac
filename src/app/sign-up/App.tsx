'use client';

import React, { useState, useRef } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useModal } from '../ModalContext';

export default function App() {
  const userIdRef = useRef<HTMLInputElement | null>(null);
  const passwordFormRef = useRef<HTMLInputElement | null>(null);
  const rePasswordFormRef = useRef<HTMLInputElement | null>(null);
  const { dispatch } = useModal();

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
        openModal();
        return;
      }

      const passwordRegExp =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      if (!passwordRegExp.test(userPW)) {
        passwordFormRef.current.focus();
        openModal();
        return;
      }
      if (userPW !== re_password) {
        rePasswordFormRef.current.focus();
        openModal();
        return;
      }

      console.log('회원가입 성공');
    }
  };

  const openModal = () => {
    dispatch({
      type: 'OPEN_MODAL',
      payload: {
        title: '주의',
        content: '조건이 올바르지 않습니다.',
      },
    });
  };

  return (
    <Box component="form">
      <h1>회원가입</h1>
      <TextField
        fullWidth
        label="Id(e-mail)"
        variant="outlined"
        name="userId"
        id="userId"
        inputRef={userIdRef}
        onChange={onChange}
        sx={{
          '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
        }}
      />

      <TextField
        fullWidth
        label="PW"
        variant="outlined"
        type="password"
        name="userPW"
        id="userPW"
        inputRef={passwordFormRef}
        onChange={onChange}
        sx={{
          '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
        }}
      />

      <TextField
        fullWidth
        label="PW 확인"
        variant="outlined"
        type="password"
        name="re_password"
        id="re_password"
        inputRef={rePasswordFormRef}
        onChange={onChange}
        sx={{
          '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
        }}
      />

      <Button type="submit" onClick={handleSubmit}>
        입력
      </Button>
    </Box>
  );
}
