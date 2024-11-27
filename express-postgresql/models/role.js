const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define Role model with permissions
const Role = sequelize.define('Role', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  permissions: {
    type: DataTypes.ARRAY(DataTypes.STRING), // Array of strings for permissions
    allowNull: false
  }
});

module.exports = Role;
