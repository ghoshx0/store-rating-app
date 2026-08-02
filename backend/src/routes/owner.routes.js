import { Router } from "express";

import ownerController from "../controllers/owner.controller.js";

import authenticate, {
  authorize,
} from "../middleware/auth.middleware.js";

import validate from "../middleware/validate.middleware.js";

import { updateStoreSchema } from "../validations/owner.validation.js";

import { getRatingsSchema } from "../validations/owner.validation.js";

const router = Router();

router.get(
  "/dashboard",
  authenticate,
  authorize("OWNER"),
  ownerController.getDashboard
);

router.get(
  "/store",
  authenticate,
  authorize("OWNER"),
  ownerController.getMyStore
);

router.put(
  "/store",
  authenticate,
  authorize("OWNER"),
  validate(updateStoreSchema),
  ownerController.updateMyStore
);

router.get(
  "/ratings",
  authenticate,
  authorize("OWNER"),
  validate(getRatingsSchema, "query"),
  ownerController.getRatings
);

export default router;