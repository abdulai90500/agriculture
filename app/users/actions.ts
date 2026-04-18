"use server";

import { prisma } from "@/lib/prisma";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";


export async function getUsers() {
  try {
    return await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

export async function createUser(data: {
  email: string;
  name: string;
  role: string;
  password?: string;
}) {
  try {
    const hashedPassword = data.password ? await bcrypt.hash(data.password, 10) : undefined;

    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        role: data.role,
        // @ts-ignore - Supress staleness in Next.js Prisma type cache
        password: hashedPassword,
      },
    });
    revalidatePath('/users');
    return { success: true, data: user };
  } catch (error: any) {
    console.error('Error creating user:', error);
    if (error.code === 'P2002') {
      return { success: false, error: 'A user with this email already exists' };
    }
    return { success: false, error: 'Failed to create user' };
  }
}

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: { id },
    });
    revalidatePath('/users');
    return { success: true };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { success: false, error: 'Failed to delete user' };
  }
}

export async function updateUserRole(id: string, role: string) {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: { role },
    });
    revalidatePath('/users');
    return { success: true, data: user };
  } catch (error) {
    console.error('Error updating user role:', error);
    return { success: false, error: 'Failed to update user role' };
  }
}
