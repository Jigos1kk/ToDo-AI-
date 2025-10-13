'use strict';
module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.createTable('task_tags', {
      task_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: 'tasks',
          key: 'id'
        }
      },
      tag_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: 'tags',
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
  down: async(queryInterface, Sequelize) => {
    await queryInterface.dropTable('task_tags');
  }
};
