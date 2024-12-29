import { Router } from 'express';
import { createRecipe, createCategory, updateRecipe, deleteRecipe } from "../services/recipes.js";

import {findRecipe} from "../services/recipes.js";
const router = Router();

router.post('/recipes/search', async function(req, res) {
  try {
    const { category, search_text } = req.body;
    if(category == undefined && search_text == undefined) {
      res.status(400).json({ message: "Search options should nt be empty" });
    }

    res.status(200).json(await findRecipe(category, search_text));
    
    
  } catch (err) {
    if(err.status) {
      res.status(err.status).json({ message: err.message })
    } else {
      res.status(400).json({message: "Error performing recipe search: " + err.message });
    }
  }
})

router.post("/create-category", async (req, res) => {
  const { categoryName } = req.body;

  if (!categoryName) {
    return res.status(400).json({ message: "Category name is required" });
  }

  try {
    await createCategory(categoryName);
    res.status(200).json({ message: `Category '${categoryName}' created or already exists.` });
  } catch (err) {
    res.status(500).json({ message: "Error creating category: " + err.message });
  }
});

router.post("/add-recipe", async (req, res) => {
  try {
    const recipeData = req.body;
    const recipe = await createRecipe(recipeData);
    res.status(201).json(recipe);
  } catch (err) {
    res.status(500).json({ message: "Error adding recipe: " + err.message });
  }
});

router.post("/recipes/add", async (req, res) => {
  try {
    const { title, description, category, cuisine, preparation_time, cooking_time, total_time, difficulty, servings, location_map } = req.body;

    if (!title || !description || !category || !cuisine) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newRecipe = await createRecipe({
      title,
      description,
      category,
      cuisine,
      preparation_time,
      cooking_time,
      total_time,
      difficulty,
      servings,
      location_map,
    });

    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: "Error adding recipe: " + err.message });
  }
});

router.put("/update-recipe/:id", async (req, res) => {
  const recipeId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedRecipe = await updateRecipe(recipeId, updatedData);
    res.status(200).json(updatedRecipe);
  } catch (err) {
    res.status(500).json({ message: "Error updating recipe: " + err.message });
  }
});

router.delete("/delete-recipe/:id", async (req, res) => {
  const recipeId = req.params.id;

  try {
    const result = await deleteRecipe(recipeId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Error deleting recipe: " + err.message });
  }
});

export default router;