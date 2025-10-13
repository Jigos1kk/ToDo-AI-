'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subtask extends Model {
    static associate(models) {
      Subtask.belongsTo(models.Task, {
        foreignKey: 'task_id',
        as: 'task'
      });
    }
  }

  Subtask.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    task_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.ENUM('pending', 'in_progress', 'completed', 'cancelled'),
      defaultValue: 'pending'
    },
    completed_at: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Subtask',
    tableName: 'subtasks',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return Subtask;
};
