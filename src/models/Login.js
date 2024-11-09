import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersFilePath = path.resolve(__dirname, '../users.json');
const secretKey = process.env.JWT_SECRET || 'your-secret-key';
const router = express.Router();

const getUsers = () => {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Login route
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Заповніть всі поля' });
  }

  const users = getUsers();
  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(400).json({ message: 'Користувач не знайдений' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Неправильний пароль' });
  }

  const token = jwt.sign({ email: user.email, name: user.name }, secretKey, { expiresIn: '1h' });
  res.json({ message: 'Успішний вхід', token });
});

export default router;
