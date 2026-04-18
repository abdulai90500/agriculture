"use server";

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user || !(user as any).password) {
      return { success: false, error: 'Invalid email or password' };
    }

    const isValid = await bcrypt.compare(password, (user as any).password);
    if (!isValid) {
      return { success: false, error: 'Invalid email or password' };
    }

    // Explicitly import cookies inside action function just to be safe
    const { cookies: nextCookies } = await import("next/headers");
    const cookieStore = await nextCookies();
    
    // Set secure cookie
    cookieStore.set('session_id', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    
    // Store role so client components can read it if needed without hitting DB again
    cookieStore.set('user_role', user.role, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return { success: true, role: user.role };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'An error occurred during login' };
  }
}

export async function logoutUser() {
  const { cookies: nextCookies } = await import("next/headers");
  const cookieStore = await nextCookies();
  cookieStore.delete('session_id');
  cookieStore.delete('user_role');
  return { success: true };
}

export async function getActiveUser() {
  const { cookies: nextCookies } = await import("next/headers");
  const cookieStore = await nextCookies();
  const sessionId = cookieStore.get('session_id');
  
  if (!sessionId?.value) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: sessionId.value },
      select: { id: true, email: true, name: true, role: true }
    });
    return user;
  } catch (error) {
    return null;
  }
}
