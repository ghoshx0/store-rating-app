import prisma from "../config/prisma.js";

class RatingRepository {
  async countRatingsByStore(storeId) {
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

	async getRatings({
		storeId,
		skip,
		take,
		sortOrder,
	}) {
		const [ratings, total] = await Promise.all([
			prisma.rating.findMany({
				where: {
					storeId,
				},
				skip,
				take,
				orderBy: {
					createdAt: sortOrder,
				},
				include: {
					user: {
						select: {
							id: true,
							name: true,
							email: true,
						},
					},
				},
			}),

			prisma.rating.count({
				where: {
					storeId,
				},
			}),
		]);

		return {
			ratings,
			total,
		};
	}

	async findRatingByUserAndStore(userId, storeId) {
		return prisma.rating.findUnique({
			where: {
				userId_storeId: {
					userId,
					storeId,
				},
			},
		});
	}

	async createRating(data) {
		return prisma.rating.create({
			data,
		});
	}

	async updateRating(userId, storeId, rating) {
		return prisma.rating.update({
			where: {
				userId_storeId: {
					userId,
					storeId,
				},
			},
			data: {
				rating,
			},
		});
	}
}

export default new RatingRepository();