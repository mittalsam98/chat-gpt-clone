import { Message } from '@prisma/client';
import { atom } from 'recoil';

// interface inputPromptArr {
//   inputVal:string,
//   responseVal:string
// }

export const inputPrompt = atom<Message[]>({
  key: 'inputPrompt',
  default: []
});
