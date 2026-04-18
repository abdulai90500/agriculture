'use server'
import { prisma } from "@/lib/prisma";

export async function getReportSummaries() {
  try {
    const totalFarmers = await prisma.farmer.count();
    const activeFarmers = await prisma.farmer.count({ where: { status: 'active' } });

    const totalProjects = await prisma.project.count();
    const successfulProjects = await prisma.project.count({ 
      where: { status: { in: ['completed', 'successful'] } } 
    });

    const cropEntries = await prisma.farmerCrop.count();
    const livestockEntries = await prisma.farmerLivestock.count();
    const livestockCount = await prisma.farmerLivestock.aggregate({
      _sum: { count: true }
    });

    const totalBudget = await prisma.project.aggregate({
      _sum: { budget: true }
    });

    return {
      farmers: {
        total: totalFarmers,
        active: activeFarmers,
        inactive: totalFarmers - activeFarmers
      },
      projects: {
        total: totalProjects,
        successful: successfulProjects,
        active: totalProjects - successfulProjects,
        budget: totalBudget._sum.budget || 0
      },
      crops: {
        totalEntries: cropEntries,
      },
      livestock: {
        totalEntries: livestockEntries,
        population: livestockCount._sum.count || 0
      }
    };
  } catch (error) {
    console.error('Error fetching report summaries:', error);
    throw new Error('Failed to load report data');
  }
}

export async function getRecentActivities() {
  try {
    const activities = await prisma.dataCollection.findMany({
      take: 10,
      orderBy: { collectedAt: 'desc' },
      include: {
        farmer: true,
        user: true
      }
    });

    return activities.map(a => ({
      id: a.id,
      name: `${a.dataType.replace('_', ' ').toUpperCase()} - ${a.farmer.name}`,
      type: a.dataType,
      generatedDate: a.collectedAt,
      size: `${(Math.random() * 5).toFixed(1)} MB`, // Placeholder size
      format: 'PDF'
    }));
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    return [];
  }
}

export async function exportDataToCSV(category: string) {
  try {
    let data: any[] = [];
    let headers: string[] = [];

    switch (category.toLowerCase()) {
      case 'farmers':
        data = await prisma.farmer.findMany();
        headers = ['ID', 'Name', 'Phone', 'Location', 'Status', 'JoinDate'];
        break;
      case 'projects':
        data = await prisma.project.findMany();
        headers = ['ID', 'Name', 'Status', 'Budget', 'Location', 'StartDate'];
        break;
      case 'crops':
        data = await prisma.farmerCrop.findMany({ include: { farmer: true, crop: true } });
        headers = ['Farmer', 'Crop', 'Area', 'Status', 'PlantDate'];
        break;
      case 'livestock':
        data = await prisma.farmerLivestock.findMany({ include: { farmer: true, livestock: true } });
        headers = ['Farmer', 'Type', 'Count', 'Health', 'Weight'];
        break;
      default:
        throw new Error('Invalid export category');
    }

    if (data.length === 0) return "No data available for export";

    const csvRows = [headers.join(',')];
    
    data.forEach(item => {
      const values = headers.map(header => {
        const h = header.toLowerCase();
        
        if (category === 'farmers') {
          if (h === 'id') return item.id;
          if (h === 'name') return `"${item.name || ''}"`;
          if (h === 'phone') return `"${item.phone || ''}"`;
          if (h === 'location') return `"${item.location || ''}"`;
          if (h === 'status') return item.status;
          if (h === 'joindate') return item.joinDate?.toLocaleDateString();
        }
        
        if (category === 'projects') {
          if (h === 'id') return item.id;
          if (h === 'name') return `"${item.name || ''}"`;
          if (h === 'status') return item.status;
          if (h === 'budget') return item.budget || 0;
          if (h === 'location') return `"${item.location || ''}"`;
          if (h === 'startdate') return item.startDate?.toLocaleDateString();
        }

        if (category === 'crops') {
          if (h === 'farmer') return `"${item.farmer?.name || ''}"`;
          if (h === 'crop') return `"${item.crop?.name || ''}"`;
          if (h === 'area') return item.area || 0;
          if (h === 'status') return item.status;
          if (h === 'plantdate') return item.plantDate?.toLocaleDateString();
        }

        if (category === 'livestock') {
          if (h === 'farmer') return `"${item.farmer?.name || ''}"`;
          if (h === 'type') return `"${item.livestock?.type || ''}"`;
          if (h === 'count') return item.count || 0;
          if (h === 'health') return item.healthStatus;
          if (h === 'weight') return item.avgWeight || 0;
        }

        return '';
      });
      csvRows.push(values.join(','));
    });

    return csvRows.join('\n');
  } catch (error) {
    console.error('CSV Export Error:', error);
    return 'Error generating CSV';
  }
}
