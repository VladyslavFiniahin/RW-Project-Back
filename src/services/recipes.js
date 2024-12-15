import { Op } from "sequelize";
import Recipe from "../models/Recipe.js";
import Category from "../models/Category.js";

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
    const categoryId = await getCategoryIdByName(category);

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

async function getCategoryIdByName(category_name) {
  try {
    const category = await Category.findOne({
      where: {
        name: category_name,
      },
    });

    if (!category) {
      throw {
        status: 500,
        message: "Could not get category id by name. " + err.message,
      };
    }

    return category.category_id;
  } catch (err) {
    throw { status: 400, message: "Could not get category id" };
  }
}

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

export async function createRecipe(recipeData) {
  try {
    await createCategory();

    const categoryId = await getCategoryIdByName(recipeData.category);

    if (!categoryId) {
      throw new Error("Category not found");
    }

    const recipe = await Recipe.create({
      title: recipeData.title,
      description: recipeData.description,
      cuisine_type: recipeData.cuisine_type,
      category_id: categoryId,
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