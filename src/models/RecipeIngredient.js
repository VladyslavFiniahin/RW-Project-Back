import { DataTypes } from "sequelize";
import { sequelize } from "../../config/dbConfig.js";
import Recipe from "./Recipe.js";
import Ingredient from "./Ingredient.js";

const RecipeIngredient = sequelize.define("RecipeIngredient", {
  recipe_ingredient_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true, // Unique identifier for each record in RecipeIngredients
  },
  recipe_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Recipe,
      key: "recipe_id",
    },
    allowNull: false,
  },
  ingredient_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Ingredient,
      key: "ingredient_id",
    },
    allowNull: false,
  },
  quantity: {
    type: DataTypes.DECIMAL,
    allowNull: false, // Amount of the ingredient
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false, // Unit of measure (e.g., 'grams', 'cups')
  },
}, {
  tableName: "RecipeIngredients"
});

// Set up many-to-many associations
Recipe.belongsToMany(Ingredient, {
  through: RecipeIngredient,
  foreignKey: "recipe_id",
});
Ingredient.belongsToMany(Recipe, {
  through: RecipeIngredient,
  foreignKey: "ingredient_id",
});

export default RecipeIngredient;
