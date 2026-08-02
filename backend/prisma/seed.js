import bcrypt from "bcrypt";
import prisma from "../src/config/prisma.js";

async function main() {
  console.log("🌱 Starting database seed...");

  // Hash default password once
  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  // ==========================
  // ADMIN
  // ==========================
  const admin = await prisma.user.upsert({
    where: {
      email: "admin@store.com",
    },
    update: {
      name: "System Administrator",
      password: hashedPassword,
      address: "Head Office",
      role: "ADMIN",
    },
    create: {
      name: "System Administrator",
      email: "admin@store.com",
      password: hashedPassword,
      address: "Head Office",
      role: "ADMIN",
    },
  });

  // ==========================
  // STORE OWNERS
  // ==========================
  const ambaniOwner = await prisma.user.upsert({
    where: {
      email: "ambani@store.com",
    },
    update: {
      name: "Ambani Owner",
      password: hashedPassword,
      address: "Mumbai",
      role: "OWNER",
    },
    create: {
      name: "Ambani Owner",
      email: "ambani@store.com",
      password: hashedPassword,
      address: "Mumbai",
      role: "OWNER",
    },
  });

  const adaniOwner = await prisma.user.upsert({
    where: {
      email: "adani@store.com",
    },
    update: {
      name: "Adani Owner",
      password: hashedPassword,
      address: "Ahmedabad",
      role: "OWNER",
    },
    create: {
      name: "Adani Owner",
      email: "adani@store.com",
      password: hashedPassword,
      address: "Ahmedabad",
      role: "OWNER",
    },
  });

  // ==========================
  // STORES
  // ==========================
  const relianceMart = await prisma.store.upsert({
    where: {
      email: "reliance@store.com",
    },
    update: {
      name: "Reliance Mart",
      address: "Mumbai",
      ownerId: ambaniOwner.id,
    },
    create: {
      name: "Reliance Mart",
      email: "reliance@store.com",
      address: "Mumbai",
      ownerId: ambaniOwner.id,
    },
  });

  const powerPlant = await prisma.store.upsert({
    where: {
      email: "powerplant@store.com",
    },
    update: {
      name: "Power Plant",
      address: "Ahmedabad",
      ownerId: adaniOwner.id,
    },
    create: {
      name: "Power Plant",
      email: "powerplant@store.com",
      address: "Ahmedabad",
      ownerId: adaniOwner.id,
    },
  });

  // ==========================
  // USERS
  // ==========================
  const harsh = await prisma.user.upsert({
    where: {
      email: "harsh@gmail.com",
    },
    update: {
      name: "Harsh",
      password: hashedPassword,
      address: "Nagpur",
      role: "USER",
    },
    create: {
      name: "Harsh",
      email: "harsh@gmail.com",
      password: hashedPassword,
      address: "Nagpur",
      role: "USER",
    },
  });

  const gaurav = await prisma.user.upsert({
    where: {
      email: "gaurav@gmail.com",
    },
    update: {
      name: "Gaurav",
      password: hashedPassword,
      address: "Pune",
      role: "USER",
    },
    create: {
      name: "Gaurav",
      email: "gaurav@gmail.com",
      password: hashedPassword,
      address: "Pune",
      role: "USER",
    },
  });

  const prajwal = await prisma.user.upsert({
    where: {
      email: "prajwal@gmail.com",
    },
    update: {
      name: "Prajwal",
      password: hashedPassword,
      address: "Bengaluru",
      role: "USER",
    },
    create: {
      name: "Prajwal",
      email: "prajwal@gmail.com",
      password: hashedPassword,
      address: "Bengaluru",
      role: "USER",
    },
  });

  // ==========================
  // RATINGS
  // ==========================

  await prisma.rating.upsert({
    where: {
      userId_storeId: {
        userId: harsh.id,
        storeId: relianceMart.id,
      },
    },
    update: {
      rating: 5,
    },
    create: {
      userId: harsh.id,
      storeId: relianceMart.id,
      rating: 5,
    },
  });

  await prisma.rating.upsert({
    where: {
      userId_storeId: {
        userId: gaurav.id,
        storeId: relianceMart.id,
      },
    },
    update: {
      rating: 4,
    },
    create: {
      userId: gaurav.id,
      storeId: relianceMart.id,
      rating: 4,
    },
  });

  await prisma.rating.upsert({
    where: {
      userId_storeId: {
        userId: prajwal.id,
        storeId: powerPlant.id,
      },
    },
    update: {
      rating: 5,
    },
    create: {
      userId: prajwal.id,
      storeId: powerPlant.id,
      rating: 5,
    },
  });

  await prisma.rating.upsert({
    where: {
      userId_storeId: {
        userId: harsh.id,
        storeId: powerPlant.id,
      },
    },
    update: {
      rating: 3,
    },
    create: {
      userId: harsh.id,
      storeId: powerPlant.id,
      rating: 3,
    },
  });

  console.log("✅ Database seeded successfully.");
}

main()
  .then(async () => {
    console.log("🎉 Seed completed.");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });