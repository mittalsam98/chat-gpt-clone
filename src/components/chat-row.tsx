'use client';
import { Message } from '@prisma/client';
import Link from 'next/link';
import React, { useState } from 'react';
import { FiMessageSquare } from 'react-icons/fi';
import { RiDeleteBinFill } from 'react-icons/ri';
import { useParams } from 'next/navigation';

interface inputProps {
  id: string;
  messages: Message[];
}

export default function ChatRow({ id, messages }: inputProps) {
  const [isHovered, setIsHovered] = useState(false);
  const params = useParams();

  return (
    <div
      className={`text-gray-100 overflow-y-auto rounded py-3 px-3 ${
        params.id === id ? 'bg-gray-700' : ''
      }`}
    >
      <Link
        href={`/dashboard/${id}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className='flex items-center gap-3 cursor-pointer break-all relative hover:pr-4 group'
      >
        <FiMessageSquare className='h-4 w-4' />
        <div className='flex flex-1  justify-center text-ellipsis max-h-5 overflow-hidden break-all text-[14px]'>
          {messages && messages.length > 0 ? messages[0].content : 'Your previous conversations'}
          <span
            className={`h-4 w-4 absolute right-0 flex ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          >
            <RiDeleteBinFill className='h-5 w-5 text-white ' />
          </span>
        </div>
      </Link>
    </div>
  );
}
