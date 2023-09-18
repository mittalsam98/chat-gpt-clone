import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';

export default function Loading() {
  return (
    <div className='flex items-center w-full h-full justify-center'>
      <FadeLoader color='#000' />
    </div>
  );
}
