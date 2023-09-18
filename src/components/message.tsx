import { SiOpenai } from 'react-icons/si';
import { FaUserCircle } from 'react-icons/fa';

import { Message } from '@prisma/client';
import { useUser } from '@clerk/nextjs';
interface Props {
  message: Message;
}

const Message = ({ message }: Props) => {
  const { user } = useUser();

  return (
    <div
      className={`group w-full text-gray-800 border-b border-black/10 p-4 justify-center ${
        message.role == 'USER' ? 'bg-white' : 'bg-gray-50 '
      }`}
    >
      <div className='flex flex-row gap-4 md:gap-6 p-4 md:py-6 lg:px-0 m-auto w-full md:max-w-2xl lg:max-w-[38rem] xl:max-w-3xl items-start '>
        <div className='w-8 p-1'>
          {message.role == 'USER' ? (
            <FaUserCircle className='h-4 w-4' />
          ) : (
            <SiOpenai className='h-4 w-4' />
          )}
        </div>
        <div className='relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]'>
          <div className='flex flex-grow flex-col gap-3'>
            <div className='min-h-20 flex flex-col items-start gap-4 whitespace-pre-wrap break-words'>
              <div className='markdown prose w-full break-words dark:prose-invert dark'>
                {/* {!isUser && text === null ? (
                    <TbCursorText className='h-6 w-6 animate-pulse' />
                  ) : (
                    <p>{text}</p>
                  )} */}
                {message.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
