import { DataTypes } from "sequelize";
import { sequelize } from '../../config/dbConfig.js';

const Tag = sequelize.define('Tag', {
  tag_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true, 
  },
  recipe_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Recipes", 
      key: 'recipe_id', 
    },
    onDelete: 'CASCADE', 
  },
  tag: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
}, {
  tableName: "Tags"
});

export default Tag;
