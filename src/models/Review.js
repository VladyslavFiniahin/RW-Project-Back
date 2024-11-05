import { DataTypes } from "sequelize";
import { sequelize } from '../../config/dbConfig.js';
import Recipe from './Recipe.js'; 
import User from './User.js'; 

const Review = sequelize.define('Review', {
  review_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true, 
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
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'user_id',
    },
    onDelete: 'CASCADE', 
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5, 
    }
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  review_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW 
  },
}, {
  tableName: "Reviews"
});

export default Review;
