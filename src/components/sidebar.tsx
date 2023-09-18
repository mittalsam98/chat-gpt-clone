'use client';
import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { UserButton } from '@clerk/nextjs';
import ChatRow from './chat-row';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Message } from '@prisma/client';

interface Chats {
  id: string;
  Message: Message[];
}

export default function Sidebar() {
  const [chats, setChats] = useState<Chats[]>([]);
  const router = useRouter();

  const newChat = async (e: any) => {
    try {
      const res = await axios.get('/api/create-chat');
      if (res.data.chatId) {
        router.push(`/dashboard/${res.data.chatId}`);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const fetchAllUsers = async () => {
    const response = await axios.get(`/api/get-chats`);
    setChats(response.data.userChats);
  };
  useEffect(() => {
    const res = fetchAllUsers();
  }, []);

  return (
    <div className='flex flex-col h-full w-60  border-white/20 '>
      <div className='h-full space-y-1 p-2'>
        <div className='mb-1 flex flex-row gap-2' onClick={newChat}>
          <div className='flex px-3 min-h-[44px] py-1 items-center gap-3 transition-colors duration-200 text-white cursor-pointer text-sm rounded border border-white/20 hover:bg-gray-500/10 h-11 flex-grow overflow-hidden'>
            <AiOutlinePlus className='h-4 w-4' />
            New chat
          </div>
        </div>
        {chats &&
          chats.length &&
          chats.map((val, i) => {
            return <ChatRow key={i} id={val?.id} messages={val?.Message} />;
          })}
      </div>
      <div className='h-full flex-1 space-y-1 p-2'>
        <UserButton afterSignOutUrl='/' />
      </div>
    </div>
  );
}
