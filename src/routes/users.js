import { Router } from "express";
import { register, login, updateUser } from "../services/users.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Fill in all fields." });
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
    return res.status(400).json({ message: "Fill in all fields." });
  }

  try {
    const registerResponse = await register(username, email, password);
    return res.status(200).json(registerResponse);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
});

router.put("/update", async (req, res) => {
  const { userId, username, email, password } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID required" });
  }

  try {
    const updateResponse = await updateUser(userId, { username, email, password });
    return res.status(200).json(updateResponse);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
});

export default router;
