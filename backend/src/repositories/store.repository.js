import prisma from "../config/prisma.js";

class StoreRepository {
  async countStores() {
    return prisma.store.count();
  }

  async countRatings() {
    return prisma.rating.count();
  }

  async createStore(storeData) {
    return prisma.store.create({
      data: storeData,
    });
  }

  async findStoreByEmail(email) {
    return prisma.store.findUnique({
      where: {
        email,
      },
    });
  }

  async getStores({
    skip,
    take,
    search,
    sortBy,
    sortOrder,
  }) {
    const where = search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              email: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              address: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }
      : {};

    const [stores, total] = await Promise.all([
      prisma.store.findMany({
        where,
        skip,
        take,
        orderBy: {
          [sortBy]: sortOrder,
        },
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },

          ratings: {
            select: {
              rating: true,
            },
          },
        },
      }),

      prisma.store.count({
        where,
      }),
    ]);

    return {
      stores,
      total,
    };
  }

  async findStoreById(id) {
    return prisma.store.findUnique({
      where: {
        id,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async countStoreRatings(storeId) {
    return prisma.rating.count({
      where: {
        storeId,
      },
    });
  }

  async getAverageRating(storeId) {
    const result = await prisma.rating.aggregate({
      where: {
        storeId,
      },
      _avg: {
        rating: true,
      },
    });

    return result._avg.rating ?? 0;
  }

  async getStoreByOwnerId(ownerId) {
    return prisma.store.findFirst({
      where: {
        ownerId,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async updateStore(storeId, data) {
    return prisma.store.update({
      where: {
        id: storeId,
      },
      data,
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async getAllStores({
    skip,
    take,
    search,
    sortBy,
    sortOrder,
    userId,
  }){
    const where = search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              address: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }
      : {};

    const [stores, total] = await Promise.all([
      prisma.store.findMany({
        where,
        skip,
        take,
        orderBy: {
          [sortBy]: sortOrder,
        },
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },

          ratings: {
            select: {
              rating: true,
              userId: true,
            },
          },
        },
      }),

      prisma.store.count({
        where,
      }),
    ]);

    return {
      stores,
      total,
    };
  }
}

export default new StoreRepository();