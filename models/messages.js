'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    static associate() {}
  }

  Messages.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      underscored: true,
      updatedAt: false,
      modelName: 'Messages',
      tableName: 'messages',
    }
  );

  return Messages;
};
