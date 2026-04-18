import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from 'next/server'







// GET all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(projects, { status: 200 })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// POST create a new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { name, description, location, budget, startDate, endDate } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Project name is required' },
        { status: 400 }
      )
    }

    const project = await prisma.project.create({
      data: {
        name,
        description: description || null,
        location: location || null,
        budget: budget ? parseFloat(budget) : null,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        status: 'active',
      }
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}

// PUT update a project
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { id, name, description, location, budget, startDate, endDate } = body

    if (!id || !name) {
      return NextResponse.json(
        { error: 'Project ID and name are required' },
        { status: 400 }
      )
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        name,
        description: description || null,
        location: location || null,
        budget: budget ? parseFloat(budget) : null,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
      }
    })

    return NextResponse.json(project, { status: 200 })
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

// DELETE a project
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      )
    }

    await prisma.project.delete({
      where: { id }
    })

    return NextResponse.json(
      { message: 'Project deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}
