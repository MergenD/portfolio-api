'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Apps extends Model {
    static associate() {}
  }
  Apps.init(
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
      applied: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      rejected: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      interview: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      offer: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      underscored: true,
      timestamps: false,
      tableName: 'apps',
      modelName: 'Apps',
    }
  );

  return Apps;
};
