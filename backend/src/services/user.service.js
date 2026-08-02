import bcrypt from "bcrypt";

import AppError from "../utils/app-error.js";
import userRepository from "../repositories/user.repository.js";

import storeRepository from "../repositories/store.repository.js";

import ratingRepository from "../repositories/rating.repository.js";

class UserService {
  async updatePassword(userId, data) {
    const user = await userRepository.findUserById(userId, true);

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    const isPasswordValid = await bcrypt.compare(
      data.currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      throw new AppError("Current password is incorrect.", 400);
    }

    const hashedPassword = await bcrypt.hash(
      data.newPassword,
      10
    );

    await userRepository.updatePassword(
      userId,
      hashedPassword
    );
  }

	async getStores(userId, query) {
		const page = query.page ?? 1;
		const limit = query.limit ?? 10;

		const skip = (page - 1) * limit;

		const { stores, total } =
			await storeRepository.getAllStores({
			skip,
			take: limit,
			search: query.search,
			sortBy: query.sortBy,
			sortOrder: query.sortOrder,
			userId,
			});

		const formattedStores = stores.map((store) => {
		const averageRating =
			store.ratings.length === 0
			? 0
			: store.ratings.reduce(
				(sum, rating) => sum + rating.rating,
				0
				) / store.ratings.length;

		const userRating =
			store.ratings.find(
			(rating) => rating.userId === userId
			)?.rating ?? null;

		return {
			...store,
			averageRating: Number(
			averageRating.toFixed(1)
			),
			userRating,
			ratings: undefined,
		};
		});

		return {
			stores: formattedStores,

			pagination: {
				total,
				page,
				limit,
				totalPages: Math.ceil(total / limit),
			},
		};
	}

	async submitRating(userId, data) {
		const store = await storeRepository.findStoreById(
			data.storeId
		);

		if (!store) {
			throw new AppError("Store not found.", 404);
		}

		const existingRating =
			await ratingRepository.findRatingByUserAndStore(
				userId,
				data.storeId
			);

		if (existingRating) {
			throw new AppError(
				"You have already rated this store.",
				409
			);
		}

		return ratingRepository.createRating({
			userId,
			storeId: data.storeId,
			rating: data.rating,
		});
	}

	async updateRating(userId, data) {
		const store = await storeRepository.findStoreById(
			data.storeId
		);

		if (!store) {
			throw new AppError("Store not found.", 404);
		}

		const existingRating =
			await ratingRepository.findRatingByUserAndStore(
				userId,
				data.storeId
			);

		if (!existingRating) {
			throw new AppError(
				"Rating not found.",
				404
			);
		}

		return ratingRepository.updateRating(
			userId,
			data.storeId,
			data.rating
		);
	}
}

export default new UserService();