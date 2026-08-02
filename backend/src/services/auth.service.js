import bcrypt from "bcrypt";
import userRepository from "../repositories/user.repository.js";
import AppError from "../utils/app-error.js";
import { generateToken } from "../utils/jwt.js";

class AuthService {
  async register(userData) {
    const { name, email, password, address } = userData;

    // Check if user already exists
    const existingUser = await userRepository.findUserByEmail(email);

    if (existingUser) {
      throw new AppError(
          "Email already exists.",
          409
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await userRepository.createUser({
      name,
      email,
      password: hashedPassword,
      address,
      role: "USER",
    });

    // Remove password before returning
    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async login(loginData) {
    const { email, password } = loginData;

    // Find user
    const user = await userRepository.findUserByEmail(email);

    if (!user) {
      throw new AppError("Invalid email or password.", 401);
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new AppError("Invalid email or password.", 401);
    }

    // Generate JWT
    const token = generateToken(user);

    // Remove password before returning
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  Ok}

	async signup(userData) {
		const existingUser = await userRepository.findUserByEmail(
			userData.email
		);

		if (existingUser) {
			throw new AppError("Email already exists.", 409);
		}

		const hashedPassword = await bcrypt.hash(userData.password, 10);

		const user = await userRepository.createUser({
			...userData,
			password: hashedPassword,
			role: "USER",
		});

		return user;
	}
}

export default new AuthService();