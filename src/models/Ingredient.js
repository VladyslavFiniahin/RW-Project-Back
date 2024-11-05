import { DataTypes } from "sequelize";
import { sequelize } from '../../config/dbConfig.js';

const Ingredient = sequelize.define('Ingredient', {
  ingredient_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nutritional_value: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: "Ingredients"
});

export default Ingredient;
