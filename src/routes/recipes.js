import { Router } from 'express';
import { createRecipe, updateRecipe, deleteRecipe, getRandomRecipe, getLast20Recipes, getRecipesByCategoryAndCuisine, getAllRecipes, getLastTwentyRecipes } from "../services/recipes.js";

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

  if (!updatedData || Object.keys(updatedData).length === 0) {
    return res.status(400).json({ message: "Request body is required" });
  }

  try {
    const updatedRecipe = await updateRecipe(recipeId, updatedData);
    res.status(200).json(updatedRecipe);
  } catch (err) {
    if (err.message === "Recipe not found") {
      return res.status(404).json({ message: "Recipe not found" });
    } else if (err.message === "No data provided to update" || err.message.includes("not found")) {
      return res.status(400).json({ message: "Invalid or incomplete data provided" });
    }
    res.status(500).json({ message: "Error updating recipe: " + err.message });
  }
});


router.delete("/delete-recipe/:id", async (req, res) => {
  const recipeId = req.params.id;

  try {
    const result = await deleteRecipe(recipeId);
    res.status(200).json(result);
  } catch (err) {
    if (err.message === "Recipe not found") {
      res.status(404).json({ message: "Recipe not found" });
    } else {
      res.status(500).json({ message: "Error deleting recipe: " + err.message });
    }
  }
});

router.get("/random-recipe", async (req, res) => {
  try {
    const randomRecipe = await getRandomRecipe();
    res.status(200).json({ recipe_id: randomRecipe });
  } catch (err) {
    res.status(500).json({ message: "Error fetching random recipe: " + err.message });
  }
});

router.get("/last-20-recipes", async (req, res) => {
  try {
    const last20Recipes = await getLast20Recipes();
    res.status(200).json(last20Recipes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching last 20 recipes: " + err.message });
  }
});
//

router.get("/recipes/filter", async (req, res) => { //! change to post later
  const { category, cuisine } = req.query;

  try {
    if (!category && !cuisine) {
      return res.status(400).json({ message: "At least one filter (category or cuisine) required" });
    }

    const recipes = await getRecipesByCategoryAndCuisine(category, cuisine);
    if (recipes.length === 0) {
      return res.status(404).json({ message: `No recipes found for category '${category}' and cuisine '${cuisine}'` });
    }
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// gotta remake that if needed
router.get("/recipes/getall", async (req, res) => {
  try {
    const recipes = await getAllRecipes();
    if(recipes.length === 0) {
      return res.status(404).json({ message: `No recipes found` });
    }

    res.status(200).json(recipes);
  } catch(err) {
    res.status(500).json({message: err.message});
  }
});

router.get("/recipes/getlast10", async (req, res) => {
  try {
    const recipes = await getAllRecipes();
    if(recipes.length === 0) {
      return res.status(404).json({ message: `No recipes found` });
    }

    res.status(200).json(recipes);
  } catch(err) {
    res.status(500).json({message: err.message});
  }
});

router.get("/recipes/getlast20", async (req, res) => {
  try {
    const recipes = await getLastTwentyRecipes();
    if (recipes.length === 0) {
      return res.status(404).json({ message: `No recipes found` });
    }

    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;