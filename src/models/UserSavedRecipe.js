import { DataTypes } from "sequelize";
import { sequelize } from '../../config/dbConfig.js';
import User from './User.js'; 
import Recipe from './Recipe.js'; 

const UserSavedRecipe = sequelize.define('UserSavedRecipe', {
  user_saved_id: {
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
    allowNull: false,
    references: {
      model: Recipe, 
      key: 'recipe_id', 
    },
    onDelete: 'CASCADE', 
  },
}, {
  tableName: "UserSavedRecipes"
});

export default UserSavedRecipe;
