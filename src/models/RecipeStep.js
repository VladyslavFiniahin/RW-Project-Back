import { DataTypes } from "sequelize";
import { sequelize } from '../../config/dbConfig.js';
import Recipe from './Recipe.js';

const RecipeStep = sequelize.define('RecipeStep', {
  step_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true, // Unique identifier for each step
  },
  recipe_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Recipe,
      key: 'recipe_id'
    },
    allowNull: false, // Foreign key to link to Recipe
  },
  step_number: {
    type: DataTypes.INTEGER,
    allowNull: false, // Step order within the recipe
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false, // Description of the cooking step
  },
}, {
  tableName: "RecipeSteps"
});

// Define relationship
Recipe.hasMany(RecipeStep, { foreignKey: 'recipe_id', onDelete: 'CASCADE' });
RecipeStep.belongsTo(Recipe, { foreignKey: 'recipe_id' });

export default RecipeStep;
