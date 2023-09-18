import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // defaults to process.env["OPENAI_API_KEY"]
});
export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { message, id } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Check if the user already exists in your database
    const existingUser = await prisma.user.findUnique({
      where: { userId }
    });

    if (!existingUser) {
      // If the user doesn't exist, create a new user with the provided userId
      await prisma.user.create({
        data: {
          userId
        }
      });
    }

    // Check if the chat already exists for the user
    let chat = await prisma.chat.findFirst({
      where: {
        id
      }
    });

    if (!chat) {
      // If the chat doesn't exist, create a new chat for the user
      chat = await prisma.chat.create({
        data: {
          userId
        }
      });
    }

    if (!message) {
      return new NextResponse('Messages are required', { status: 400 });
    }
    if (!process.env.OPENAI_API_KEY) {
      return new NextResponse('OpenAI API Key not configured.', { status: 500 });
    }
    // Create the message associated with the chat
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }]
    });

    const gptResponseContent = response.choices[0].message.content || 'Something Went Wrong'; // Extract GPT response content

    await prisma.message.create({
      data: {
        content: message,
        userId, // Associate the message with the user
        chatId: chat.id // Associate the message with the chat
      }
    });

    await prisma.message.create({
      data: {
        content: gptResponseContent, // Use GPT's response content
        userId,
        chatId: chat.id,
        role: 'SYSTEM'
      }
    });
    const chatMessage = await prisma.chat.findUnique({
      where: {
        id: chat.id
      },
      include: {
        Message: true
      }
    });
    return NextResponse.json({ chatMessage }, { status: 200 });
    // return new NextResponse(gptResponseContent, { status: 201 });
  } catch (error) {
    console.log('[CONVERSATION_ERROR]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
