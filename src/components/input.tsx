import { FormSchema } from '@/lib/zodSchema';
import { inputPrompt } from '@/store/atoms/inputPrompt';
import React, { ChangeEvent, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { FiLoader } from 'react-icons/fi';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { Message } from '@prisma/client';
import { useUser } from '@clerk/nextjs';
import SyncLoader from 'react-spinners/SyncLoader';

interface Props {
  id?: string;
}

export default function Input({ id }: Props) {
  const { user } = useUser();
  const [inputValue, setInputValue] = useState('');
  const [loading, setIsLoading] = useState(false);
  const [messages, setMessages] = useRecoilState<Message[]>(inputPrompt);
  const handleKeypress = (e: any) => {
    if (e.keyCode == 13 && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };
  const onSubmit = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    const enteredPromptMessage: Message = {
      chatId: id!,
      content: inputValue,
      role: 'USER',
      userId: user?.id || null,
      timestamp: new Date(),
      id: Math.random()
    };
    setMessages((prevState) => [...prevState, enteredPromptMessage]);

    try {
      const response = await axios.post('/api/openai', { message: inputValue, id: id });
      setInputValue('');
      setMessages(response.data.chatMessage.Message);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
    }
  };
  return (
    <div className='sticky bottom-0 left-0 w-full border-t md:border-t-0  md:border-transparent bg-white pt-2'>
      <form className='stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl'>
        <div className='flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] '>
          <textarea
            tabIndex={0}
            data-id='root'
            value={inputValue}
            onKeyDown={handleKeypress}
            style={{
              height: '24px',
              maxHeight: '200px',
              overflowY: 'hidden'
            }}
            onChange={handleChange}
            placeholder='Send a message...'
            className='m-0 w-full resize-none border-0 p-0 pr-7 focus:ring-0 focus:outline-none focus-visible:ring-0 md:pl-0'
          ></textarea>
          <button
            disabled={loading || inputValue?.length === 0}
            onClick={onSubmit}
            className='absolute p-1 rounded-md  right-1 md:right-2 disabled:opacity-40 disabled:cursor-not-allowed'
          >
            {loading ? <SyncLoader color='#000' /> : <FiSend className='h-4 w-4 mr-1 text-gray ' />}
          </button>
        </div>
      </form>
      <div className='px-3 pt-2 pb-3 text-center text-xs text-black/50 dark:text-white/50 md:px-4 md:pt-3 md:pb-6'>
        <span>
          Free Research Preview. ChatGPT may produce inaccurate information about people, places, or
          facts. ChatGPT August 3 Version
        </span>
      </div>
    </div>
  );
}
