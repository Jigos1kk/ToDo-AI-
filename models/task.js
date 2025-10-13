'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      Task.hasMany(models.Subtask, {
        foreignKey: 'task_id',
        as: 'subtasks'
      });
      Task.hasMany(models.Attachment, {
        foreignKey: 'task_id',
        as: 'attachments'
      });
      Task.hasMany(models.TaskHistory, {
        foreignKey: 'task_id',
        as: 'taskHistories'
      });
      Task.hasMany(models.Notification, {
        foreignKey: 'task_id',
        as: 'notifications'
      });
      Task.belongsTo(models.Task, {
        foreignKey: 'parent_task_id',
        as: 'parentTask'
      });
      Task.belongsToMany(models.Category, {
        through: 'TaskCategory',
        foreignKey: 'task_id',
        as: 'categories'
      });
      Task.belongsToMany(models.Tag, {
        through: 'TaskTag',
        foreignKey: 'task_id',
        as: 'tags'
      });
    }
  };
  Task.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.ENUM('pending', 'in_progress', 'completed', 'cancelled'),
      defaultValue: 'pending'
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
      defaultValue: 'medium'
    },
    due_date: {
      type: DataTypes.DATE
    },
    completed_at: {
      type: DataTypes.DATE
    },
    deleted_at: {
      type: DataTypes.DATE
    },
    parent_task_id: {
      type: DataTypes.UUID
    },
    recurrence_pattern: {
      type: DataTypes.ENUM('daily', 'weekly', 'monthly', 'yearly')
    },
    recurrence_end_date: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    underscored: true,
  });
  return Task;
};
