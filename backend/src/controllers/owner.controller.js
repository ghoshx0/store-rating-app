import ownerService from "../services/owner.service.js";

class OwnerController {
  async getDashboard(req, res, next) {
    try {
      const dashboard = await ownerService.getDashboard(
        req.user.id
      );

      return res.status(200).json({
        success: true,
        message: "Owner dashboard fetched successfully.",
        data: dashboard,
      });
    } catch (error) {
      next(error);
    }
  }

	async getMyStore(req, res, next) {
		try {
			const store = await ownerService.getMyStore(req.user.id);

			return res.status(200).json({
				success: true,
				message: "Store fetched successfully.",
				data: store,
			});
		} catch (error) {
			next(error);
		}
	}

	async updateMyStore(req, res, next) {
		try {
			const store = await ownerService.updateMyStore(
				req.user.id,
				req.body
			);

			return res.status(200).json({
				success: true,
				message: "Store updated successfully.",
				data: store,
			});
		} catch (error) {
			next(error);
		}
	}

	async getRatings(req, res, next) {
		try {
			const data = await ownerService.getRatings(
  			  req.user.id,
  			  req.validated.query
			);

			return res.status(200).json({
				success: true,
				message: "Ratings fetched successfully.",
				data,
			});
		} catch (error) {
			next(error);
		}
	}
}

export default new OwnerController();