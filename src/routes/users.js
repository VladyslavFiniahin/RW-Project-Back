import { Router } from "express";
import { register, login, getAllUsers } from "../services/users.js";
import { updateUser } from "../services/update.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Заповніть всі поля" });
  }

  try {
    const loginResponse = await login(email, password);
    return res.status(200).json(loginResponse);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
});

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Заповніть всі поля" });
  }

  try {
    const registerResponse = await register(username, email, password);
    return res.status(200).json(registerResponse);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
});

router.get("/list", async (req, res) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
});

router.put("/update", async (req, res) => {
  const { userId, username, email, password } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "Необхідно вказати ID користувача" });
  }

  try {
    const updateResponse = await updateUser(userId, { username, email, password });
    return res.status(200).json(updateResponse);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
});

export default router;
