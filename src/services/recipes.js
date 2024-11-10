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
