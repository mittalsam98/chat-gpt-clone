import Sidebar from '@/components/sidebar';
import { AiOutlineMenu } from 'react-icons/ai';
export default function DashBoardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='overflow-hidden w-full h-screen relative flex'>
      <div className=' hidden flex-shrink-0 bg-gray-900 md:flex md:flex-col'>
        <Sidebar />
      </div>
      <div className='flex flex-shrink-0 md:hidden'>
        <AiOutlineMenu />
      </div>
      {children}
    </main>
  );
}
