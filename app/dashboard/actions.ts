'use server'
import { prisma } from "@/lib/prisma";

export async function getDashboardTelemetry() {
  try {
    const totalFarmers = await prisma.farmer.count();
    const activeProjects = await prisma.project.count({ where: { status: 'active' } });
    const successfulProjects = await prisma.project.count({ 
      where: { status: { in: ['completed', 'successful'] } } 
    });
    const trackedCrops = await prisma.crop.count();
    const reportsCount = await prisma.dataCollection.count();

    return {
      totalFarmers,
      activeProjects,
      successfulProjects,
      trackedCrops,
      reportsCount
    };
  } catch (error) {
    console.error('Error fetching dashboard telemetry:', error);
    return {
      totalFarmers: 0,
      activeProjects: 0,
      successfulProjects: 0,
      trackedCrops: 0,
      reportsCount: 0
    };
  }
}

export async function getChartTelemetry() {
  try {
    // 1. Farmer Growth over time (last 6 months)
    const farmers = await prisma.farmer.findMany({
      select: { createdAt: true },
      orderBy: { createdAt: 'asc' }
    });
    
    const farmerGrowth = farmers.reduce((acc: any, f) => {
      const month = f.createdAt.toLocaleString('default', { month: 'short' });
      const existing = acc.find((m: any) => m.name === month);
      if (existing) existing.farmers++;
      else acc.push({ name: month, farmers: 1 });
      return acc;
    }, []);

    // 2. Project Progress (Status distribution)
    const projects = await prisma.project.findMany({
      select: { name: true, status: true }
    });
    
    const projectProgress = projects.map(p => ({
      name: p.name.length > 10 ? p.name.substring(0, 10) + '...' : p.name,
      progress: p.status.toLowerCase() === 'completed' || p.status.toLowerCase() === 'successful' ? 100 : 50
    }));

    // 3. Crop Distribution
    const cropDist = await prisma.farmerCrop.findMany({
      include: { crop: true }
    });

    const cropData = cropDist.reduce((acc: any, fc) => {
      const name = fc.crop.name;
      const existing = acc.find((c: any) => c.name === name);
      if (existing) existing.value++;
      else acc.push({ name, value: 1 });
      return acc;
    }, []);

    return {
      farmerGrowth: farmerGrowth.slice(-6),
      projectProgress: projectProgress.slice(0, 5),
      cropData: cropData.length > 0 ? cropData : [{ name: 'No Data', value: 1 }]
    };
  } catch (error) {
    console.error('Error fetching chart telemetry:', error);
    return {
      farmerGrowth: [],
      projectProgress: [],
      cropData: []
    };
  }
}

export async function getIndicatorTelemetry() {
  try {
    const indicators = await prisma.indicator.findMany({
      take: 20,
      orderBy: { lastUpdated: 'desc' },
      include: { project: true }
    });

    const livestockPopulation = await prisma.farmerLivestock.aggregate({
      _sum: { count: true }
    });

    const livestockByType = await prisma.farmerLivestock.findMany({
      include: { livestock: true }
    });

    const livestockDistribution = livestockByType.reduce((acc: any, item) => {
      const type = item.livestock.type;
      const existing = acc.find((l: any) => l.name === type);
      if (existing) existing.value += item.count;
      else acc.push({ name: type, value: item.count, color: COLORS[acc.length % COLORS.length] });
      return acc;
    }, []);

    return {
      indicators,
      totalLivestock: livestockPopulation._sum.count || 0,
      livestockDistribution: livestockDistribution.length > 0 ? livestockDistribution : [{ name: 'N/A', value: 1, color: '#ccc' }]
    };
  } catch (error) {
    console.error('Error fetching indicator telemetry:', error);
    return { indicators: [], totalLivestock: 0, livestockDistribution: [] };
  }
}

const COLORS = ["#16a34a", "#2d6a4f", "#4ade80", "#1b4332", "#74c69d", "#b7e4c7"];
