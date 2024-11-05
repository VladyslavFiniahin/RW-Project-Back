// models/ActivityHistory.js
import { DataTypes } from "sequelize";
import { sequelize } from '../../config/dbConfig.js';
import User from './User.js'; 
import Recipe from './Recipe.js'; 
import UserSavedRecipe from './UserSavedRecipe.js'; 

const ActivityHistory = sequelize.define('ActivityHistory', {
  activity_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, 
      key: 'user_id', 
    },
    onDelete: 'CASCADE', 
  },
  recipe_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Recipe, 
      key: 'recipe_id', 
    },
    onDelete: 'SET NULL', 
  },
  saved_recipe_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: UserSavedRecipe, 
      key: 'user_saved_id',
    },
    onDelete: 'SET NULL', 
  },
  search_query: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
}, {
  tableName: "ActivityHistory"
});

export default ActivityHistory;
