import { Router } from "express";

import adminController from "../controllers/admin.controller.js";

import authenticate, {
  authorize,
} from "../middleware/auth.middleware.js";

import validate from "../middleware/validate.middleware.js";

import {
  createUserSchema,
  getUsersSchema,
  getUserByIdSchema,
  createStoreSchema,
  getStoresSchema,
  getStoreByIdSchema,
} from "../validations/admin.validation.js";

const router = Router();

router.get(
  "/dashboard",
  authenticate,
  authorize("ADMIN"),
  adminController.getDashboardStatistics
);

router.get(
  "/users",
  authenticate,
  authorize("ADMIN"),
  validate(getUsersSchema, "query"),
  adminController.getUsers
);

router.get(
  "/users/:id",
  authenticate,
  authorize("ADMIN"),
  validate(getUserByIdSchema, "params"),
  adminController.getUserById
);

router.post(
  "/users",
  authenticate,
  authorize("ADMIN"),
  validate(createUserSchema),
  adminController.createUser
);

router.post(
  "/stores",
  authenticate,
  authorize("ADMIN"),
  validate(createStoreSchema),
  adminController.createStore
);

router.get(
  "/stores",
  authenticate,
  authorize("ADMIN"),
  validate(getStoresSchema, "query"),
  adminController.getStores
);

router.get(
  "/stores/:id",
  authenticate,
  authorize("ADMIN"),
  validate(getStoreByIdSchema, "params"),
  adminController.getStoreById
);

export default router;