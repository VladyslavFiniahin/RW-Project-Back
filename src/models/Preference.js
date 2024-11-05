// models/Preference.js
import { DataTypes } from "sequelize";
import { sequelize } from '../../config/dbConfig.js';
import User from './User.js'; // Assuming the User model is defined in User.js

const Preference = sequelize.define('Preference', {
  preference_id: {
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
  favorite_category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  favorite_ingredient: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  disliked_ingredient: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
}, {
  tableName: "Preferences"
});

export default Preference;
