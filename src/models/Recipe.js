import { DataTypes } from "sequelize";
import { sequelize } from '../../config/dbConfig.js';

import Category from "./Category.js";
import Tag from "./Tag.js";
import Cuisine from "./Cuisine.js";

const Recipe = sequelize.define('Recipe', {
  recipe_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,  
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true //change to false later
  },
  cuisine_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Cuisine,
      key: 'cuisine_id',
    },
    allowNull: false,
  },
  category_id: { // Use category_id instead of category for foreign key reference
    type: DataTypes.INTEGER,
    references: {
      model: Category, // Foreign key relationship with Category model
      key: 'category_id',
    },
    allowNull: false,
  },
  preparation_time: {
    type: DataTypes.INTEGER,
    allowNull: true //change to false later
  },
  cooking_time: {
    type: DataTypes.INTEGER,
    allowNull: true //change to false later
  },
  total_time: {
    type: DataTypes.INTEGER,
    allowNull: true //change to false later
  },
  difficulty: {
    type: DataTypes.ENUM('easy', 'medium', 'hard'),
    allowNull: true //change to false later
  },
  servings: {
    type: DataTypes.INTEGER,
    allowNull: true //change to false later
  },
  location_map: {
    type: DataTypes.STRING,
    allowNull: true
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: "Recipes"
});


Recipe.hasMany(Category, { foreignKey: 'category_id' });
Category.hasMany(Recipe, { foreignKey: 'category_id' });

export default Recipe;