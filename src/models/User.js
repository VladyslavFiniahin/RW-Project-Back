import { DataTypes } from "sequelize";
import { sequelize } from '../../config/dbConfig.js';

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true, 
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
    validate: {
      isEmail: true, 
    }
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true, 
  },
}, {
  tableName: "Users"
});

export default User;
