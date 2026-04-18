import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";








export async function GET(request: NextRequest) {
  try {
    const farmers = await prisma.farmer.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(farmers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch farmers' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const farmer = await prisma.farmer.create({
      data: {
        name: data.name,
        phone: data.phone || null,
        location: data.location,
        status: data.status || 'active',
        joinDate: new Date(),
        lastActivity: new Date(),
      },
    });
    return NextResponse.json(farmer, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create farmer' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const farmer = await prisma.farmer.update({
      where: { id: data.id },
      data: {
        name: data.name,
        phone: data.phone,
        location: data.location,
        status: data.status,
        lastActivity: new Date(),
      },
    });
    return NextResponse.json(farmer);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update farmer' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const data = await request.json();
    await prisma.farmer.delete({
      where: { id: data.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete farmer' }, { status: 500 });
  }
}
