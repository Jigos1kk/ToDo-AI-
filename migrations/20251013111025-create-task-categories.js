'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('task_categories', {
      task_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: 'tasks',
          key: 'id'
        }
      },
      category_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: 'categories',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('task_categories');
  }
};
