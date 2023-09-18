'use client';

import { RecoilRoot, atom } from 'recoil';
export const todoListState = atom({
  key: 'TodoList',
  default: []
});

export default function RecoilContextProvider({ children }: { children: React.ReactNode }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
