import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export async function register(username, email, password) {
  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });

    if (existingUser) {
      throw { status: 400, message: "User with this email or username already exists." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return { message: "Registration successful", userId: result.user_id };
  } catch (error) {
    throw { status: error.status || 500, message: "Registration error: " + error.message };
  }
}

export async function login(email, password) {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw { status: 404, message: "Incorrect login details" };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw { status: 400, message: "Incorrect login details" };
    }

    const token = jwt.sign(
      { userId: user.user_id, username: user.username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return { message: "Login successful", token, userId: user.user_id };
  } catch (error) {
    throw { status: 400, message: "Login error: " + error.message };
  }
}

export async function updateUser(userId, updates) {
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      throw { status: 404, message: "User not found" };
    }

    if (updates.username) {
      const existingUser = await User.findOne({
        where: { username: updates.username },
        attributes: ["user_id"],
      });
      if (existingUser && existingUser.user_id !== userId) {
        throw { status: 400, message: "Username is already taken." };
      }
      user.username = updates.username;
    }

    if (updates.email) {
      const existingEmail = await User.findOne({
        where: { email: updates.email },
        attributes: ["user_id"],
      });
      if (existingEmail && existingEmail.user_id !== userId) {
        throw { status: 400, message: "Email already exist" };
      }
      user.email = updates.email;
    }

    if (updates.password) {
      const hashedPassword = await bcrypt.hash(updates.password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    return { message: "Profile successfully updated" };
  } catch (error) {
    throw { status: error.status || 500, message: "Profile update error: " + error.message };
  }
}
