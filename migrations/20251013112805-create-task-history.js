'use strict';
module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.createTable('task_history', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      task_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tasks',
          key: 'id'
        }
      },
      action: {
        type: Sequelize.ENUM('create', 'update', 'delete', 'complete'),
        allowNull: false
      },
      old_values: {
        type: Sequelize.JSON
      },
      new_values: {
        type: Sequelize.JSON
      },
      changed_at: {
        type: Sequelize.DATE
      },
      changed_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
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
    await queryInterface.addIndex('task_history', ['task_id']);
    await queryInterface.addIndex('task_history', ['changed_at']);
  },
  down: async(queryInterface, Sequelize) => {
    await queryInterface.dropTable('task_history');
  }
};
