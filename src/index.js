import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import path from "path";
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import express from "express";
import { sequelize } from "../config/dbConfig.js";
import RecipesRouter from './routes/recipes.js';
import UsersRouter from "./routes/users.js";
import { associateModels } from './models/index.js'; // Import the associateModels function
import { createDefaultCategories, createDefaultCuisines } from "./services/recipes.js";


// models
import Recipe from "./models/Recipe.js";
import ActivityHistory from "./models/ActivityHistory.js";
import Category from "./models/Category.js";
import Ingredient from "./models/Ingredient.js";
import Preference from "./models/Preference.js";
import RecipeIngredient from "./models/RecipeIngredient.js";
import RecipeStep from "./models/RecipeStep.js";
import Review from "./models/Review.js";
import User from "./models/User.js";
import UserSavedRecipe from "./models/UserSavedRecipe.js";
import Tag from "./models/Tag.js";
import Cuisine from "./models/Cuisine.js";

const app = express();
const port = process.env.PORT || 3000;

// Serve static files for images
app.use('/img', express.static(path.join(__dirname, '/img')));

app.use(
  cors({
      origin: 'http://94.231.178.180', // Allow specific origin
      methods: ['GET', 'POST'],       // Allow specific methods
      credentials: true,              // Allow cookies if needed
  })
);
app.use(express.json());
app.use("/api", RecipesRouter);
app.use("/api/users", UsersRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

console.log("PORT FROM ENV:", process.env.PORT);
app.listen(port, () => {
  console.log(`App is listening on the port ${port}`);
});

// database
const createConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );

  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  // Sync the models (create tables if they do not exist)
  await sequelize.sync(
    // { force: true } //! only for development
  );
  associateModels();

  await createDefaultCategories();
  await createDefaultCuisines();
};

createConnection();
