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
      throw { status: 400, message: "Користувач із таким email або username вже існує" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return { message: "Реєстрація успішна", userId: result.user_id };
  } catch (error) {
    throw { status: error.status || 500, message: "Помилка реєстрації: " + error.message };
  }
}

export async function login(email, password) {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw { status: 404, message: "Користувача не знайдено" };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw { status: 400, message: "Невірний пароль" };
    }

    const token = jwt.sign(
      { userId: user.user_id, username: user.username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return { message: "Вхід успішний", token, userId: user.user_id };
  } catch (error) {
    throw { status: 400, message: "Помилка входу: " + error.message };
  }
}

export async function getAllUsers() {
  try {
    const users = await User.findAll({
      attributes: ["user_id", "username", "email", "avatar", "bio", "createdAt"],
    });
    return users;
  } catch (error) {
    throw { status: 500, message: "Не вдалося отримати користувачів: " + error.message };
  }
}
