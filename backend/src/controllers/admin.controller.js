import adminService from "../services/admin.service.js";

class AdminController {
  async getDashboardStatistics(req, res, next) {
    try {
      const statistics = await adminService.getDashboardStatistics();

      return res.status(200).json({
        success: true,
        message: "Dashboard statistics fetched successfully.",
        data: statistics,
      });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      const user = await adminService.createUser(req.body);

      return res.status(201).json({
        success: true,
        message: "User created successfully.",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      const result = await adminService.getUsers(req.validated.query);

      return res.status(200).json({
        success: true,
        message: "Users fetched successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const user = await adminService.getUserById(
        req.validated.params.id
      );

      return res.status(200).json({
        success: true,
        message: "User fetched successfully.",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async createStore(req, res, next) {
    try {
      const store = await adminService.createStore(
        req.validated.body
      );

      return res.status(201).json({
        success: true,
        message: "Store created successfully.",
        data: store,
      });
    } catch (error) {
      next(error);
    }
  }

  async getStores(req, res, next) {
    try {
      const result = await adminService.getStores(
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

  async getStoreById(req, res, next) {
    try {
      const store = await adminService.getStoreById(
        req.validated.params.id
      );

      return res.status(200).json({
        success: true,
        message: "Store fetched successfully.",
        data: store,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AdminController();