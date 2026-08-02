import prisma from "../config/prisma.js";

class UserRepository {
  async findUserByEmail(email) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findUserById(id, includePassword = false) {
    return prisma.user.findUnique({
      where: { id },
      ...(includePassword
        ? {}
        : {
            select: {
              id: true,
              name: true,
              email: true,
              address: true,
              role: true,
              createdAt: true,
              updatedAt: true,
            },
          }),
    });
  }

	async createUser(userData) {
		return await prisma.user.create({
			data: userData,
			select: {
				id: true,
				name: true,
				email: true,
				address: true,
				role: true,
				createdAt: true,
				updatedAt: true,
			},
		});
	}
  
  async countUsers() {
    return prisma.user.count();
  }

  async countUsersByRole(role) {
    return prisma.user.count({
      where: {
        role,
      },
    });
  }

  async getUsers({
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
  
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take,
        orderBy: {
          [sortBy]: sortOrder,
        },
        select: {
          id: true,
          name: true,
          email: true,
          address: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
  
      prisma.user.count({
        where,
      }),
    ]);

    return { users, total };
  }

	async findOwnerById(ownerId) {
		return prisma.user.findFirst({
			where: {
				id: ownerId,
				role: "OWNER",
			},
		});
	}

	async updatePassword(userId, password) {
		return prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				password,
			},
		});
	}
}

export default new UserRepository();