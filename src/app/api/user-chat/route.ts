import { auth } from '@clerk/nextjs';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('User Id not found', { status: 401 });
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
        userId
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

    // Now that the chat exists, you can add the message
    const body = await req.json();
    const { message } = body;

    if (!message) {
      return new NextResponse('Message is required', { status: 400 });
    }

    // Create the message associated with the chat
    await prisma.message.create({
      data: {
        content: message,
        userId, // Associate the message with the user
        chatId: chat.id // Associate the message with the chat
      }
    });

    return new NextResponse('Message created successfully', { status: 200 });
  } catch (error) {
    console.error('Request error', error);
    return new NextResponse('Internal server error', { status: 500 });
  } finally {
    await prisma.$disconnect(); // Close the Prisma client connection
  }
}
