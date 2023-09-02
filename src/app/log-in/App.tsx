'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField } from '@mui/material';
import { useModal } from '../ModalContext';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { dispatch } = useModal();

  interface FormData {
    id: string;
    pw: string;
  }

  const onSubmit = (data: FormData) => {
    const { id, pw } = data;

    if (id === 'helloworld' && pw === 'Qwer!234') {
      dispatch({
        type: 'OPEN_MODAL',
        payload: {
          title: '로그인 성공',
          content: '성공적으로 로그인하였습니다.',
        },
      });
    } else {
      dispatch({
        type: 'OPEN_MODAL',
        payload: {
          title: '로그인 실패',
          content: '아이디 또는 패스워드가 틀렸습니다.',
        },
      });
    }
  };

  return (
    <Box onSubmit={handleSubmit(onSubmit)} component="form">
      <TextField
        fullWidth
        label="id"
        variant="outlined"
        {...register('id', { required: true, minLength: 1 })}
      />
      {errors.id?.type === 'required' && <p role="alert">Id is required</p>}

      <TextField
        fullWidth
        label="pw"
        variant="outlined"
        type="password"
        {...register('pw', {
          required: true,
          pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$/,
        })}
      />
      {errors.pw?.type === 'required' && (
        <p role="alert">PASSWORD is required</p>
      )}
      {errors.pw?.type === 'pattern' && (
        <p role="alert">
          비밀번호는 8자 이상, 대문자/소문자/특수문자를 모두 포함해야 합니다.
        </p>
      )}

      <Button type="submit">Login</Button>
    </Box>
  );
}
