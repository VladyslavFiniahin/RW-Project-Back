import { DataTypes } from "sequelize";
import { sequelize } from '../../config/dbConfig.js';

const Cuisine = sequelize.define("Cuisine", {
  cuisine_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
}, {
  tableName: "Cuisines",
});

export default Cuisine;
