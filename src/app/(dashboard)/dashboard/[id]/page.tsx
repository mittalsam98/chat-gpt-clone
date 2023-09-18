'use client';

import React, { Suspense, useEffect, useState } from 'react';
import ChatgptModel from '@/components/chatgpt-model';
import MessageComp from '@/components/message';
import axios from 'axios';
import Input from '@/components/input';
import { useRecoilState } from 'recoil';
import { inputPrompt } from '@/store/atoms/inputPrompt';
import { Message } from '@prisma/client';

interface Props {
  params: { id: string };
}

export default function DashBoardChatHomePage({ params: { id } }: Props) {
  const [messages, setMessages] = useRecoilState<Message[]>(inputPrompt);

  const fetchAllMessages = async () => {
    const response = await axios.get(`/api/get-messages?id=${id}`);
    setMessages(response.data.chatMessage.Message);
  };
  useEffect(() => {
    fetchAllMessages();
  }, [id]);

  return (
    <div className='flex w-full h-full flex-col items-center relative overflow-scroll'>
      <ChatgptModel />
      <div>
          {messages.map((message, index) => (
            <MessageComp key={index} message={message} />
          ))}
      </div>
      <div className='align-center px-2 pb-2 md:pb-[8vh]'></div>
      <Input id={id} />
    </div>
  );
}
