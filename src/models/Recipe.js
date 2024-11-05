import { DataTypes } from "sequelize";
import { sequelize } from '../../config/dbConfig.js';

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
    allowNull: false
  },
  cuisine_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preparation_time: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cooking_time: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  total_time: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  difficulty: {
    type: DataTypes.ENUM('easy', 'medium', 'hard'),
    allowNull: false
  },
  servings: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  location_map: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  tableName: "Recipes"
});

export default Recipe;