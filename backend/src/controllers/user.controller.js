import userService from "../services/user.service.js";

class UserController {
  async updatePassword(req, res, next) {
    try {
      await userService.updatePassword(
        req.user.id,
        req.validated.body
      );

      return res.status(200).json({
        success: true,
        message: "Password updated successfully.",
      });
    } catch (error) {
      next(error);
    }
  }

	async getStores(req, res, next) {
		try {
			const result = await userService.getStores(
			req.user.id,
			req.validated.query
			);

			return res.status(200).json({
				success: true,
				message: "Stores fetched successfully.",
				data: result,
			});
		} catch (error) {
			next(error);
		}
	}

	async submitRating(req, res, next) {
		try {
			const rating = await userService.submitRating(
				req.user.id,
				req.validated.body
			);

			return res.status(201).json({
				success: true,
				message: "Rating submitted successfully.",
				data: rating,
			});
		} catch (error) {
			next(error);
		}
	}

	async updateRating(req, res, next) {
		try {
			const rating = await userService.updateRating(
				req.user.id,
				req.validated.body
			);

			return res.status(200).json({
				success: true,
				message: "Rating updated successfully.",
				data: rating,
			});
		} catch (error) {
			next(error);
		}
	}
}

export default new UserController();