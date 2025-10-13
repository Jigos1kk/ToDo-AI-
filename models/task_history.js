'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskHistory extends Model {
    static associate(models) {
      TaskHistory.belongsTo(models.Task, {
        foreignKey: 'task_id',
        as: 'task'
      });
      TaskHistory.belongsTo(models.User, {
        foreignKey: 'changed_by',
        as: 'user'
      });
    }
  };
  TaskHistory.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    task_id: DataTypes.UUID,
    action: DataTypes.ENUM('create', 'update', 'delete', 'complete'),
    old_values: DataTypes.JSON,
    new_values: DataTypes.JSON,
    changed_at: DataTypes.DATE,
    changed_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TaskHistory',
    tableName: 'task_history',
    underscored: true,
    timestamps: false
  });
  return TaskHistory;
};
