import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className='h-full bg-[#ccc] flex items-center justify-center'>
      <SignUp />
    </div>
  );
}
