import userRepository from "../repositories/user.repository.js";
import storeRepository from "../repositories/store.repository.js";
import bcrypt from "bcrypt";

import AppError from "../utils/app-error.js";

class AdminService {
  async getDashboardStatistics() {
    const [
      totalUsers,
      totalAdmins,
      totalOwners,
      totalCustomers,
      totalStores,
      totalRatings,
    ] = await Promise.all([
      userRepository.countUsers(),
      userRepository.countUsersByRole("ADMIN"),
      userRepository.countUsersByRole("OWNER"),
      userRepository.countUsersByRole("USER"),
      storeRepository.countStores(),
      storeRepository.countRatings(),
    ]);

    return {
      totalUsers,
      totalAdmins,
      totalOwners,
      totalCustomers,
      totalStores,
      totalRatings,
    };
  }

  async createUser(userData) {
    const {
      name,
      email,
      password,
      address,
      role,
    } = userData;

    // Check duplicate email
    const existingUser = await userRepository.findUserByEmail(email);

    if (existingUser) {
      throw new AppError("Email already exists.", 409);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await userRepository.createUser({
      name,
      email,
      password: hashedPassword,
      address,
      role,
    });

    // Remove password
    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
  
  async getUsers(query) {
    const {
      page,
      limit,
      search,
      sortBy,
      sortOrder,
    } = query;

    const skip = (page - 1) * limit;

    const { users, total } = await userRepository.getUsers({
      skip,
      take: limit,
      search,
      sortBy,
      sortOrder,
    });

    return {
      users,
      pagination: {
        page,
        limit,
        totalRecords: total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getUserById(id) {
    const user = await userRepository.findUserById(id);
    
    if (!user) {
      throw new AppError("User not found.", 404);
    }

    return user;
  }

  async createStore(storeData) {
    const {
      name,
      email,
      address,
      ownerId,
    } = storeData;

    const existingStore =
      await storeRepository.findStoreByEmail(email);

    if (existingStore) {
      throw new AppError(
        "Store email already exists.",
        409
      );
    }

    const owner =
      await userRepository.findUserById(ownerId, true);

    if (!owner) {
      throw new AppError("Owner not found.", 404);
    }

    if (owner.role !== "OWNER") {
      throw new AppError(
        "Selected user is not a store owner.",
        400
      );
    }

    const store =
      await storeRepository.createStore({
        name,
        email,
        address,
        ownerId,
      });

    return store;
  }

  async getStores(query) {
    const {
      page,
      limit,
      search,
      sortBy,
      sortOrder,
    } = query;

    const skip = (page - 1) * limit;

    const { stores, total } =
      await storeRepository.getStores({
        skip,
        take: limit,
        search,
        sortBy,
        sortOrder,
      });

    const formattedStores = stores.map((store) => {
      const averageRating =
        store.ratings.length === 0
          ? null
          : store.ratings.reduce(
              (sum, rating) => sum + rating.rating,
              0
            ) / store.ratings.length;

      return {
        ...store,
        averageRating:
          averageRating === null
            ? null
            : Number(averageRating.toFixed(1)),
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

  async getStoreById(id) {
    const store = await storeRepository.findStoreById(id);

    if (!store) {
      throw new AppError("Store not found.", 404);
    }

    return store;
  }
}

export default new AdminService();