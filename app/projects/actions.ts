'use server'
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache'

export type Project = {
  id: string
  name: string
  description: string | null
  status: string
  startDate: Date | null
  endDate: Date | null
  budget: number | null
  location: string | null
  latitude: number | null
  longitude: number | null
  createdAt: Date
  updatedAt: Date
}

export async function getProjects(): Promise<Project[]> {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return projects as Project[]
  } catch (error) {
    console.error('Error fetching projects:', error)
    throw new Error('Failed to fetch projects')
  }
}

export async function getProject(id: string): Promise<Project | null> {
  try {
    const project = await prisma.project.findUnique({
      where: { id }
    })
    return project as Project | null
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

export async function createProject(formData: FormData) {
  try {
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const location = formData.get('location') as string
    const budget = formData.get('budget') ? parseFloat(formData.get('budget') as string) : null
    const startDate = formData.get('startDate') ? new Date(formData.get('startDate') as string) : null
    const endDate = formData.get('endDate') ? new Date(formData.get('endDate') as string) : null

    if (!name) {
      throw new Error('Project name is required')
    }

    const project = await prisma.project.create({
      data: {
        name,
        description: description || null,
        location: location || null,
        budget,
        startDate,
        endDate,
        status: 'active',
      }
    })

    revalidatePath('/projects')
    return { success: true, project }
  } catch (error) {
    console.error('Error creating project:', error)
    return { success: false, error: 'Failed to create project' }
  }
}

export async function updateProject(formData: FormData) {
  try {
    const id = formData.get('id') as string
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const location = formData.get('location') as string
    const budget = formData.get('budget') ? parseFloat(formData.get('budget') as string) : null
    const startDate = formData.get('startDate') ? new Date(formData.get('startDate') as string) : null
    const endDate = formData.get('endDate') ? new Date(formData.get('endDate') as string) : null

    if (!id || !name) {
      throw new Error('Project ID and name are required')
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        name,
        description: description || null,
        location: location || null,
        budget,
        startDate,
        endDate,
      }
    })

    revalidatePath('/projects')
    return { success: true, project }
  } catch (error) {
    console.error('Error updating project:', error)
    return { success: false, error: 'Failed to update project' }
  }
}

export async function deleteProject(id: string) {
  try {
    if (!id) {
      throw new Error('Project ID is required')
    }

    await prisma.project.delete({
      where: { id }
    })

    revalidatePath('/projects')
    return { success: true }
  } catch (error) {
    console.error('Error deleting project:', error)
    return { success: false, error: 'Failed to delete project' }
  }
}