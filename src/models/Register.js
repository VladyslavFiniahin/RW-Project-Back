import express from 'express';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersFilePath = path.resolve(__dirname, '../users.json');
const router = express.Router();

const getUsers = () => {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const saveUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Заповніть всі поля' });
  }

  const users = getUsers();
  const userExists = users.find((user) => user.email === email);

  if (userExists) {
    return res.status(400).json({ message: 'Користувач з такою електронною поштою вже існує' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Пароль повинен бути не менше 6 символів' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { name, email, password: hashedPassword };
  users.push(newUser);
  saveUsers(users);

  res.status(201).json({ message: 'Користувач успішно зареєстрований' });
});

export default router;
