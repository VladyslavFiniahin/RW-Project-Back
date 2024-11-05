import { DataTypes } from "sequelize";
import { sequelize } from '../../config/dbConfig.js';

const Category = sequelize.define('Category', {
  category_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true, 
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
}, {
  tableName: "Categories"
});

export default Category;