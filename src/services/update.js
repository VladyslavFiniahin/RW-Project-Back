import User from "../models/User.js";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

export async function updateUser(userId, updates) {
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      throw { status: 404, message: "Користувача не знайдено" };
    }

    if (updates.username) {
      const existingUser = await User.findOne({
        where: { username: updates.username },
        attributes: ["user_id"],
      });
      if (existingUser && existingUser.user_id !== userId) {
        throw { status: 400, message: "Ім'я користувача вже зайняте" };
      }
      user.username = updates.username;
    }

    if (updates.email) {
      const existingEmail = await User.findOne({
        where: { email: updates.email },
        attributes: ["user_id"],
      });
      if (existingEmail && existingEmail.user_id !== userId) {
        throw { status: 400, message: "Email вже зайнятий" };
      }
      user.email = updates.email;
    }

    if (updates.password) {
      const hashedPassword = await bcrypt.hash(updates.password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    return { message: "Профіль успішно оновлено" };
  } catch (error) {
    throw { status: error.status || 500, message: "Помилка оновлення профілю: " + error.message };
  }
}
