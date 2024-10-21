import dotenv from 'dotenv';
import { fileURLToPath } from 'url'; 
import { dirname, resolve } from 'path'; 
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
import express from 'express';

const app = express()
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

console.log(process.env.PORT)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
