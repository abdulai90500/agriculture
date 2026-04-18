"use server";
import { prisma } from "@/lib/prisma";



import { revalidatePath } from "next/cache";








export interface Farmer {
  id: string;
  name: string;
  phone?: string;
  location: string;
  status: string;
  joinDate: Date;
  lastActivity: Date;
}

export async function getCrops() {
  try {
    return await prisma.crop.findMany({ orderBy: { name: 'asc' } });
  } catch (error) {
    console.error('Error fetching crops:', error);
    return [];
  }
}

export async function getLivestock() {
  try {
    return await prisma.livestock.findMany({ orderBy: { type: 'asc' } });
  } catch (error) {
    console.error('Error fetching livestock:', error);
    return [];
  }
}

export async function getFarmers() {
  try {
    const farmers = await prisma.farmer.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        crops: { include: { crop: true } },
        livestock: { include: { livestock: true } }
      }
    });
    return farmers;
  } catch (error) {
    console.error('Error fetching farmers:', error);
    return [];
  }
}

export async function createFarmer(data: {
  name: string;
  phone?: string;
  location: string;
  status?: string;
  crops?: { cropId: string; area: number }[];
  livestock?: { livestockId: string; count: number }[];
}) {
  try {
    const farmer = await prisma.farmer.create({
      data: {
        name: data.name,
        phone: data.phone || null,
        location: data.location,
        status: data.status || 'active',
        joinDate: new Date(),
        lastActivity: new Date(),
        crops: data.crops && data.crops.length > 0 ? {
          create: data.crops.map(c => ({
            cropId: c.cropId,
            area: c.area,
            status: 'planted',
          }))
        } : undefined,
        livestock: data.livestock && data.livestock.length > 0 ? {
          create: data.livestock.map(l => ({
            livestockId: l.livestockId,
            count: l.count,
            healthStatus: 'healthy',
          }))
        } : undefined,
      },
    });
    revalidatePath('/farmers');
    return { success: true, data: farmer };
  } catch (error) {
    console.error('Error creating farmer:', error);
    return { success: false, error: 'Failed to create farmer' };
  }
}

export async function updateFarmer(id: string, data: {
  name?: string;
  phone?: string;
  location?: string;
  status?: string;
  crops?: { cropId: string; area: number }[];
  livestock?: { livestockId: string; count: number }[];
}) {
  try {
    const farmer = await prisma.farmer.update({
      where: { id },
      data: {
        name: data.name,
        phone: data.phone || null,
        location: data.location,
        status: data.status,
        lastActivity: new Date(),
        crops: data.crops ? {
          deleteMany: {},
          create: data.crops.map(c => ({
            cropId: c.cropId,
            area: c.area,
            status: 'planted',
          }))
        } : undefined,
        livestock: data.livestock ? {
          deleteMany: {},
          create: data.livestock.map(l => ({
            livestockId: l.livestockId,
            count: l.count,
            healthStatus: 'healthy',
          }))
        } : undefined,
      },
    });
    revalidatePath('/farmers');
    return { success: true, data: farmer };
  } catch (error) {
    console.error('Error updating farmer:', error);
    return { success: false, error: 'Failed to update farmer' };
  }
}

export async function deleteFarmer(id: string) {
  try {
    await prisma.farmer.delete({
      where: { id },
    });
    revalidatePath('/farmers');
    return { success: true };
  } catch (error) {
    console.error('Error deleting farmer:', error);
    return { success: false, error: 'Failed to delete farmer' };
  }
}

export async function getFarmerById(id: string) {
  try {
    const farmer = await prisma.farmer.findUnique({
      where: { id },
      include: {
        crops: true,
        livestock: true
      }
    });
    return farmer;
  } catch (error) {
    console.error('Error fetching farmer:', error);
    return null;
  }
}
