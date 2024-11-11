import {Router } from "express";
import { register } from "../services/users.js";
const router = Router();

router.get("/login"), async function(req, res) {
    res.json("works")
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Заповніть всі поля' });
    }
}

router.post('/register'), async function(req, res) {
    const { username, email, password } = req.body;
  
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Заповніть всі поля' });
    }

    res.status(200).json(await register(username, email, password))
}

export default router;