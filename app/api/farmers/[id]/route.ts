import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";








export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const farmer = await prisma.farmer.findUnique({
      where: { id: params.id },
    });
    if (!farmer) {
      return NextResponse.json({ error: 'Farmer not found' }, { status: 404 });
    }
    return NextResponse.json(farmer);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch farmer' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.farmer.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete farmer' }, { status: 500 });
  }
}
