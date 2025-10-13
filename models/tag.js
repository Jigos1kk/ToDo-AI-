'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      Tag.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      Tag.belongsToMany(models.Task, {
        through: 'TaskTag',
        foreignKey: 'tag_id',
        as: 'tasks'
      });
    }
  }

  Tag.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    color: {
      type: DataTypes.STRING(7)
    }
  }, {
    sequelize,
    modelName: 'Tag',
    tableName: 'tags',
    underscored: true,
    timestamps: false
  });

  return Tag;
};
