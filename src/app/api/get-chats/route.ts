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

    // Find the user based on the provided userId
    const user = await prisma.user.findUnique({
      where: {
        userId
      },
      include: {
        Chat: {
          include: {
            Message: true
          }
        },
        Message: false
      }
    });

    if (!user) {
      throw new Error('User not found');
    }

    // The user's chats and messages can be accessed as follows:
    const userChats = user.Chat;

    return NextResponse.json({ userChats }, { status: 200 });
  } catch (error) {
    console.error('Request error', error);
    return new NextResponse('Internal server error', { status: 500 });
  } finally {
    await prisma.$disconnect(); // Close the Prisma client connection
  }
}
