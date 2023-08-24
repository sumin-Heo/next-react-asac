import React from 'react';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import '../main.css';

const Page = () => {
  return (
    <div>
      <h1>이모지</h1>
      <EmojiEmotionsIcon fontSize="large" />
      <h1 className='text-blue-500 text-xl font-bold'>이건 tailwind</h1>
    </div>
  );
};

export default Page;