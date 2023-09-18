import { auth } from '@clerk/nextjs';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('User Id not found', { status: 401 });
    }
    if (!id) {
      return new NextResponse('Chat Id not found', { status: 401 });
    }
    // Find the user based on the provided userId
    const chatMessage = await prisma.chat.findUnique({
      where: {
        id
      },
      include: {
        Message: true
      }
    });

    return NextResponse.json({ chatMessage }, { status: 200 });
  } catch (error) {
    console.error('Request error', error);
    return new NextResponse('Internal server error', { status: 500 });
  } finally {
    await prisma.$disconnect(); // Close the Prisma client connection
  }
}
