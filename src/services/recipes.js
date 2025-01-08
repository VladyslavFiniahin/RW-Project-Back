import { Op } from "sequelize";
import Recipe from "../models/Recipe.js";
import Category from "../models/Category.js";
import Cuisine from "../models/Cuisine.js";

export async function findRecipe(category, search_text) {
  const whereClause = {};

  // if search text provided add to whereClause
  if (search_text.trim() !== "") {
    whereClause.title = {
      [Op.like]: `%${search_text}%`,
    };
  }

  // get category ID
  if (category) {
    const categoryId = await getCategoryIdByName(recipeData.category);

    if (categoryId) {
      whereClause.category_id = categoryId;
      console.log("category id: " + categoryId)
    }
  }

  console.log(whereClause);
  try {
    const recipes = await Recipe.findAll({
      where: whereClause
    });

    return recipes;
  } catch (err) {
    throw { status: 400, message: "it's your fault. " + err.message };
  }
}

export async function getCategoryIdByName(category_name) {
  if (!category_name) {
    throw new Error("Category name is required");
  }

  try {
    const category = await Category.findOne({
      where: { name: category_name },
    });

    if (!category) {
      throw new Error(`Category '${category_name}' not found`);
    }

    return category.category_id;
  } catch (err) {
    throw new Error("Error finding category by name: " + err.message);
  }
}


export async function getCuisineIdByName(cuisine_name) {
  try {
    const cuisine = await Cuisine.findOne({
      where: { name: cuisine_name },
    });

    if (!cuisine) {
      throw new Error(`Cuisine '${cuisine_name}' not found`);
    }

    return cuisine.cuisine_id;
  } catch (err) {
    throw new Error("Error finding cuisine by name: " + err.message);
  }
}

// add category by postman
export async function createCategory(categoryName) {
  try {
    const existingCategory = await Category.findOne({
      where: {
        name: categoryName,
      },
    });

    if (!existingCategory) {
      const category = await Category.create({
        name: categoryName,
      });
      console.log(`Category '${categoryName}' created.`);
    } else {
      console.log(`Category '${categoryName}' already exists.`);
    }
  } catch (err) {
    console.error("Error creating category:", err);
  }
}

//add category by default, when server start
const categories = [
  "Italian",
  "French",
  "Spanish",
  "Japanese",
  "Chinese",
  "Mexican",
  "Indian",
  "Greek",
  "Ukrainian",
  "Turkish",
  "Korean",
  "American",
];

export async function createDefaultCategories() {
  try {
    for (const categoryName of categories) {
      const existingCategory = await Category.findOne({
        where: { name: categoryName },
      });

      if (!existingCategory) {
        await Category.create({ name: categoryName });
        console.log(`Category '${categoryName}' created.`);
      }
    }
  } catch (err) {
    console.error("Error creating default categories:", err);
  }
}
//

//add cuisine by default, when server start
const cuisines = [
  "Breakfast",
  "Main Courses",
  "Snacks",
  "Desserts",
  "Salads",
  "Vegan Dishes",
  "Drinks",
];

export async function createDefaultCuisines() {
  try {
    for (const cuisineName of cuisines) {
      const existingCuisine = await Cuisine.findOne({
        where: { name: cuisineName },
      });

      if (!existingCuisine) {
        await Cuisine.create({ name: cuisineName });
        console.log(`Cuisine '${cuisineName}' created.`);
      }
    }
  } catch (err) {
    console.error("Error creating default cuisines:", err);
  }
}
//

export async function createRecipe(recipeData) {
  try {

    const categoryId = await getCategoryIdByName(recipeData.category);

    if (!categoryId) {
      throw new Error("Category not found");
    }

    const cuisineId = await getCuisineIdByName(recipeData.cuisine);

    if (!cuisineId) {
      throw new Error("Cuisine not found");
    }

    const recipe = await Recipe.create({
      title: recipeData.title,
      description: recipeData.description,
      category_id: categoryId,
      cuisine_id: cuisineId,
      preparation_time: recipeData.preparation_time,
      cooking_time: recipeData.cooking_time,
      total_time: recipeData.total_time,
      difficulty: recipeData.difficulty,
      servings: recipeData.servings,
      location_map: recipeData.location_map,
    });

    return recipe;
  } catch (err) {
    throw new Error("Error creating recipe: " + err.message);
  }
}

export async function updateRecipe(recipeId, updatedData) {
  try {
    const recipe = await Recipe.findByPk(recipeId);

    if (!recipe) {
      throw new Error("Recipe not found");
    }

    if (updatedData.category) {
      const categoryId = await getCategoryIdByName(updatedData.category);
      if (!categoryId) {
        throw new Error("Category not found");
      }
      updatedData.category_id = categoryId;
      delete updatedData.category;
    }

    if (updatedData.cuisine) {
      const cuisineId = await getCuisineIdByName(updatedData.cuisine);
      if (!cuisineId) {
        throw new Error("Cuisine not found");
      }
      updatedData.cuisine_id = cuisineId;
      delete updatedData.cuisine;
    }

    await recipe.update(updatedData);
    console.log(`Recipe with ID ${recipeId} updated successfully.`);

    return recipe;
  } catch (err) {
    console.error("Error updating recipe:", err);
    throw new Error("Error updating recipe: " + err.message);
  }
}

export async function deleteRecipe(recipeId) {
  try {
    const recipe = await Recipe.findByPk(recipeId);

    if (!recipe) {
      throw new Error("Recipe not found");
    }

    await recipe.destroy();
    console.log(`Recipe with ID ${recipeId} deleted successfully.`);
    return { message: `Recipe with ID ${recipeId} deleted successfully.` };
  } catch (err) {
    console.error("Error deleting recipe:", err);
    throw new Error("Error deleting recipe: " + err.message);
  }
}

export async function getRandomRecipe() {
  try {
    const recipes = await Recipe.findAll();

    if (recipes.length === 0) {
      throw new Error('No recipes found');
    }

    const randomIndex = Math.floor(Math.random() * recipes.length);
    const randomRecipe = recipes[randomIndex];

    return randomRecipe.recipe_id;
  } catch (err) {
    console.error("Error fetching random recipe:", err.message);
    throw new Error("Error fetching random recipe: " + err.message);
  }
}

export async function getLast20Recipes() {
  try {
    const last20Recipes = await Recipe.findAll({
      limit: 20,
      order: [['createdAt', 'DESC']],
      attributes: ['recipe_id'],
    });

    if (!last20Recipes || last20Recipes.length === 0) {
      throw new Error('No recipes found');
    }
    
    return last20Recipes.map(recipe => recipe.recipe_id);
  } catch (err) {
    console.error("Error fetching last 20 recipes:", err.message);
    throw new Error("Error fetching last 20 recipes: " + err.message);
  }
}
//