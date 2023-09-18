import { auth } from '@clerk/nextjs';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
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
    let chat = await prisma.chat.create({
      data: {
        userId
      }
    });

    // Now  the chat exists, you can add the message

    return NextResponse.json(
      {
        message: 'Chat create successfully',
        chatId: chat.id
      },
      {
        status: 200
      }
    );
  } catch (error) {
    console.error('Request error', error);
    return new NextResponse('Internal server error', { status: 500 });
  } finally {
    await prisma.$disconnect(); // Close the Prisma client connection
  }
}
