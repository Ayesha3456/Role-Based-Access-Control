const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Role = require('./role');  // Import Role model

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Role,  
      key: 'id',
    },
  },
});

User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });

module.exports = User;
