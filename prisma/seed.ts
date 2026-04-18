import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL!

// Create a PostgreSQL connection pool
const pool = new Pool({ connectionString })

// Create the Prisma Client with the adapter
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create sample users
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@mne-agriculture.com' },
    update: {},
    create: {
      email: 'admin@mne-agriculture.com',
      name: 'Admin User',
      role: 'admin',
    },
  })

  const fieldUser = await prisma.user.upsert({
    where: { email: 'field@mne-agriculture.com' },
    update: {},
    create: {
      email: 'field@mne-agriculture.com',
      name: 'Field Officer',
      role: 'field_officer',
    },
  })

  console.log('✅ Users created')

  // Create crops
  const maize = await prisma.crop.upsert({
    where: { id: 'maize-001' },
    update: {},
    create: {
      id: 'maize-001',
      name: 'Maize',
      variety: 'Hybrid 614',
      category: 'cereal',
      description: 'High-yielding maize variety suitable for Kenyan highlands',
    },
  })

  const rice = await prisma.crop.upsert({
    where: { id: 'rice-001' },
    update: {},
    create: {
      id: 'rice-001',
      name: 'Rice',
      variety: 'NERICA 1',
      category: 'cereal',
      description: 'Upland rice variety resistant to drought',
    },
  })

  const cassava = await prisma.crop.upsert({
    where: { id: 'cassava-001' },
    update: {},
    create: {
      id: 'cassava-001',
      name: 'Cassava',
      variety: 'TMS 419',
      category: 'root_crop',
      description: 'High-yielding cassava variety resistant to cassava mosaic disease',
    },
  })

  const beans = await prisma.crop.upsert({
    where: { id: 'beans-001' },
    update: {},
    create: {
      id: 'beans-001',
      name: 'Beans',
      variety: 'Rosecoco',
      category: 'legume',
      description: 'Popular bean variety in East Africa',
    },
  })

  const tomatoes = await prisma.crop.upsert({
    where: { id: 'tomatoes-001' },
    update: {},
    create: {
      id: 'tomatoes-001',
      name: 'Tomatoes',
      variety: 'Rio Grande',
      category: 'vegetable',
      description: 'Disease-resistant tomato variety',
    },
  })

  console.log('✅ Crops created')

  // Create livestock
  const cattle = await prisma.livestock.upsert({
    where: { id: 'cattle-001' },
    update: {},
    create: {
      id: 'cattle-001',
      type: 'cattle',
      breed: 'Friesian',
      category: 'ruminant',
      description: 'Dairy cattle breed known for high milk production',
    },
  })

  const goats = await prisma.livestock.upsert({
    where: { id: 'goats-001' },
    update: {},
    create: {
      id: 'goats-001',
      type: 'goat',
      breed: 'Galla',
      category: 'ruminant',
      description: 'Indigenous goat breed adapted to arid conditions',
    },
  })

  const poultry = await prisma.livestock.upsert({
    where: { id: 'poultry-001' },
    update: {},
    create: {
      id: 'poultry-001',
      type: 'poultry',
      breed: 'Broiler',
      category: 'poultry',
      description: 'Fast-growing broiler chicken breed',
    },
  })

  const sheep = await prisma.livestock.upsert({
    where: { id: 'sheep-001' },
    update: {},
    create: {
      id: 'sheep-001',
      type: 'sheep',
      breed: 'Dorper',
      category: 'ruminant',
      description: 'Meat sheep breed known for hardiness',
    },
  })

  console.log('✅ Livestock created')

  // Create farmers
  const farmer1 = await prisma.farmer.upsert({
    where: { id: 'farmer-001' },
    update: {},
    create: {
      id: 'farmer-001',
      name: 'John Kamau',
      phone: '+254712345678',
      location: 'Kiambu County',
      latitude: -1.0392,
      longitude: 36.7438,
      status: 'active',
      joinDate: new Date('2023-01-15'),
      lastActivity: new Date('2024-04-10'),
    },
  })

  const farmer2 = await prisma.farmer.upsert({
    where: { id: 'farmer-002' },
    update: {},
    create: {
      id: 'farmer-002',
      name: 'Mary Wanjiku',
      phone: '+254723456789',
      location: 'Nakuru County',
      latitude: -0.3031,
      longitude: 36.0800,
      status: 'active',
      joinDate: new Date('2023-03-22'),
      lastActivity: new Date('2024-04-12'),
    },
  })

  const farmer3 = await prisma.farmer.upsert({
    where: { id: 'farmer-003' },
    update: {},
    create: {
      id: 'farmer-003',
      name: 'Peter Kiprop',
      phone: '+254734567890',
      location: 'Uasin Gishu County',
      latitude: 0.5143,
      longitude: 35.2698,
      status: 'active',
      joinDate: new Date('2023-02-10'),
      lastActivity: new Date('2024-04-08'),
    },
  })

  const farmer4 = await prisma.farmer.upsert({
    where: { id: 'farmer-004' },
    update: {},
    create: {
      id: 'farmer-004',
      name: 'Grace Achieng',
      phone: '+254745678901',
      location: 'Kisumu County',
      latitude: -0.0917,
      longitude: 34.7679,
      status: 'inactive',
      joinDate: new Date('2023-04-05'),
      lastActivity: new Date('2024-03-15'),
    },
  })

  const farmer5 = await prisma.farmer.upsert({
    where: { id: 'farmer-005' },
    update: {},
    create: {
      id: 'farmer-005',
      name: 'David Mutua',
      phone: '+254756789012',
      location: 'Machakos County',
      latitude: -1.5177,
      longitude: 37.2634,
      status: 'active',
      joinDate: new Date('2023-01-28'),
      lastActivity: new Date('2024-04-11'),
    },
  })

  console.log('✅ Farmers created')

  // Create farmer-crop relationships
  await prisma.farmerCrop.upsert({
    where: { farmerId_cropId: { farmerId: farmer1.id, cropId: maize.id } },
    update: {},
    create: {
      farmerId: farmer1.id,
      cropId: maize.id,
      area: 2.5,
      yield: 4.2,
      status: 'harvesting',
      plantDate: new Date('2023-10-15'),
    },
  })

  await prisma.farmerCrop.upsert({
    where: { farmerId_cropId: { farmerId: farmer2.id, cropId: rice.id } },
    update: {},
    create: {
      farmerId: farmer2.id,
      cropId: rice.id,
      area: 1.8,
      yield: 5.1,
      status: 'growing',
      plantDate: new Date('2024-01-20'),
    },
  })

  await prisma.farmerCrop.upsert({
    where: { farmerId_cropId: { farmerId: farmer3.id, cropId: cassava.id } },
    update: {},
    create: {
      farmerId: farmer3.id,
      cropId: cassava.id,
      area: 3.2,
      yield: 18.5,
      status: 'mature',
      plantDate: new Date('2023-08-10'),
    },
  })

  console.log('✅ Farmer-crop relationships created')

  // Create farmer-livestock relationships
  await prisma.farmerLivestock.upsert({
    where: { farmerId_livestockId: { farmerId: farmer1.id, livestockId: cattle.id } },
    update: {},
    create: {
      farmerId: farmer1.id,
      livestockId: cattle.id,
      count: 5,
      healthStatus: 'healthy',
      productivity: 85,
      avgWeight: 450,
    },
  })

  await prisma.farmerLivestock.upsert({
    where: { farmerId_livestockId: { farmerId: farmer2.id, livestockId: goats.id } },
    update: {},
    create: {
      farmerId: farmer2.id,
      livestockId: goats.id,
      count: 12,
      healthStatus: 'excellent',
      productivity: 92,
      avgWeight: 35,
    },
  })

  await prisma.farmerLivestock.upsert({
    where: { farmerId_livestockId: { farmerId: farmer3.id, livestockId: poultry.id } },
    update: {},
    create: {
      farmerId: farmer3.id,
      livestockId: poultry.id,
      count: 25,
      healthStatus: 'good',
      productivity: 78,
      avgWeight: 2.2,
    },
  })

  console.log('✅ Farmer-livestock relationships created')

  // Create sample project
  const project = await prisma.project.upsert({
    where: { id: 'project-001' },
    update: {},
    create: {
      id: 'project-001',
      name: 'Agricultural Productivity Enhancement Program',
      description: 'Program to improve agricultural productivity through better farming practices and technology adoption',
      status: 'active',
      startDate: new Date('2023-01-01'),
      endDate: new Date('2025-12-31'),
      budget: 5000000,
      location: 'Kenya',
      latitude: -1.2864,
      longitude: 36.8172,
    },
  })

  console.log('✅ Project created')

  // Create indicators
  await prisma.indicator.createMany({
    data: [
      {
        projectId: project.id,
        name: 'Farmer Adoption Rate',
        description: 'Percentage of farmers adopting improved agricultural practices',
        category: 'farmer_adoption',
        targetValue: 80,
        currentValue: 65,
        unit: 'percentage',
        baseline: 45,
        frequency: 'quarterly',
      },
      {
        projectId: project.id,
        name: 'Crop Yield Improvement',
        description: 'Average crop yield increase compared to baseline',
        category: 'crop_production',
        targetValue: 25,
        currentValue: 18,
        unit: 'percentage',
        baseline: 0,
        frequency: 'monthly',
      },
      {
        projectId: project.id,
        name: 'Livestock Health Score',
        description: 'Overall livestock health and vaccination coverage',
        category: 'livestock_health',
        targetValue: 90,
        currentValue: 78,
        unit: 'percentage',
        baseline: 65,
        frequency: 'monthly',
      },
    ],
  })

  console.log('✅ Indicators created')

  // Create sample data collection entries
  await prisma.dataCollection.createMany({
    data: [
      {
        farmerId: farmer1.id,
        userId: fieldUser.id,
        cropId: maize.id,
        dataType: 'crop_production',
        quantity: 10.5,
        unit: 'tons',
        quality: 'good',
        notes: 'Excellent maize harvest this season',
        location: 'Kiambu County',
        latitude: -1.0392,
        longitude: 36.7438,
        collectedAt: new Date('2024-04-10'),
      },
      {
        farmerId: farmer2.id,
        userId: fieldUser.id,
        livestockId: goats.id,
        dataType: 'livestock_health',
        quantity: 12,
        unit: 'count',
        quality: 'excellent',
        notes: 'All goats in good health, recent vaccination completed',
        location: 'Nakuru County',
        latitude: -0.3031,
        longitude: 36.0800,
        collectedAt: new Date('2024-04-12'),
      },
    ],
  })

  console.log('✅ Sample data collection entries created')

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })