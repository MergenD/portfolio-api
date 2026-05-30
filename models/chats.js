'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chats extends Model {
    static associate(models) {}
  }
  Chats.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      question: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "User's question/message",
      },
      answer: {
        type: DataTypes.TEXT,
      },
      ip: {
        type: DataTypes.STRING,
      },
      location: {
        type: DataTypes.STRING,
      },
      responseTime: {
        type: DataTypes.INTEGER,
      },
      tokensUsed: {
        type: DataTypes.INTEGER,
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
      modelName: 'Chats',
      tableName: 'chats',
    }
  );

  return Chats;
};
