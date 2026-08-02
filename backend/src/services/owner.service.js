import AppError from "../utils/app-error.js";

import storeRepository from "../repositories/store.repository.js";
import ratingRepository from "../repositories/rating.repository.js";

class OwnerService {
  async getDashboard(ownerId) {
    const store = await storeRepository.getStoreByOwnerId(ownerId);

    if (!store) {
      throw new AppError("Store not found.", 404);
    }

    const [totalRatings, averageRating] = await Promise.all([
      ratingRepository.countRatingsByStore(store.id),
      ratingRepository.getAverageRating(store.id),
    ]);

    return {
      store: {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
      },
      statistics: {
        totalRatings,
        averageRating: Number(Number(averageRating).toFixed(2)),
      },
    };
  }

  async getMyStore(ownerId) {
		const store = await storeRepository.getStoreByOwnerId(ownerId);

		if (!store) {
			throw new AppError("Store not found.", 404);
		}

		return store;
	}

	async updateMyStore(ownerId, updateData) {
		const store = await storeRepository.getStoreByOwnerId(ownerId);

		if (!store) {
			throw new AppError("Store not found.", 404);
		}

		const updatedStore = await storeRepository.updateStore(
			store.id,
			updateData
		);

		return updatedStore;
	}

	async getRatings(ownerId, query) {
		const store = await storeRepository.getStoreByOwnerId(ownerId);

		if (!store) {
			throw new AppError("Store not found.", 404);
		}

		const page = query.page;
		const limit = query.limit;

		const skip = (page - 1) * limit;

		const { ratings, total } =
			await ratingRepository.getRatings({
				storeId: store.id,
				skip,
				take: limit,
				sortOrder: query.sortOrder,
			});

		return {
			ratings,
			pagination: {
				total,
				page,
				limit,
				totalPages: Math.ceil(total / limit),
			},
		};
	}
}

export default new OwnerService();