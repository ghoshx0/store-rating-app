import { Router } from "express";

import authenticate, {
  authorize,
} from "../middleware/auth.middleware.js";

import validate from "../middleware/validate.middleware.js";

import userController from "../controllers/user.controller.js";

import {
  updatePasswordSchema,
  getStoresSchema,
  submitRatingSchema,
  updateRatingSchema,
} from "../validations/user.validation.js";

const router = Router();

router.put(
  "/password",
  authenticate,
  authorize("USER"),
  validate(updatePasswordSchema),
  userController.updatePassword
);

router.get(
  "/stores",
  authenticate,
  authorize("USER"),
  validate(getStoresSchema, "query"),
  userController.getStores
);

router.post(
  "/ratings",
  authenticate,
  authorize("USER"),
  validate(submitRatingSchema),
  userController.submitRating
);

router.put(
  "/ratings",
  authenticate,
  authorize("USER"),
  validate(updateRatingSchema),
  userController.updateRating
);

export default router;