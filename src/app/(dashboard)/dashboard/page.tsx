'use client';
import { useEffect, useRef, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { BsChevronDown, BsPlusLg } from 'react-icons/bs';
import { RxHamburgerMenu } from 'react-icons/rx';
import ChatgptModel from '@/components/chatgpt-model';
import Input from '@/components/input';

const DashBoardHomePage = (props: any) => {
  return (
    <div className='flex w-full h-full flex-col items-center justify-between relative'>
      <ChatgptModel />
      <div className='align-center flex flex-col justify-center '>
        <h1 className='text-2xl font-semibold text-center text-gray-200  md:text-4xl '>ChatGPT</h1>
      </div>
      <div className='align-center px-2 pb-2 md:pb-[8vh]'></div>
      <Input />
    </div>
  );
};

export default DashBoardHomePage;
