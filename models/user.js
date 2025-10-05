'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      comment: "Уникальный внешний идентификатор"
    },
    device: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Device не может быть пустым'
        }
      }
    },
    ip_address: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        isIP: {
          msg: 'IP адрес должен быть валидным'
        }
      }
    },
    user_agent: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'User agent не может быть пустым'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};