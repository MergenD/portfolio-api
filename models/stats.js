'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stats extends Model {
    static associate() {}
  }
  Stats.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Unknown',
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Unknown',
      },
      ip: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Unknown',
      },
      device: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Unknown',
      },
      spentMinutes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      underscored: true,
      tableName: 'stats',
      modelName: 'Stats',
    }
  );

  return Stats;
};
