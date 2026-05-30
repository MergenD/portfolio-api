'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Applications extends Model {
    static associate() {}
  }

  Applications.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      company: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      salary: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
      },
      submittedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
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
      modelName: 'Applications',
      tableName: 'applications',
    }
  );

  return Applications;
};
