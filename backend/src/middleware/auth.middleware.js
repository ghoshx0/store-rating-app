import { verifyToken } from "../utils/jwt.js";
import userRepository from "../repositories/user.repository.js";
import AppError from "../utils/app-error.js";

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError("Access token is required.", 401);
    }

    if (!authHeader.startsWith("Bearer ")) {
      throw new AppError("Invalid authorization format.", 401);
    }

    const token = authHeader.split(" ")[1];

    let decoded;

    try {
      decoded = verifyToken(token);
    } catch {
      throw new AppError("Invalid or expired token.", 401);
    }

    const { userId } = verifyToken(token);

    const user = await userRepository.findUserById(
      userId,
      true
    );

    if (!user) {
      throw new AppError("User not found.", 401);
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          "You are not authorized to access this resource.",
          403
        )
      );
    }

    next();
  };
};

export default authenticate;