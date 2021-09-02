'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('ShoeTables', {
      fields: ['user_id'],
      type: 'FOREIGN KEY',
      name: 'user_id-fk-in-comments',
      references: {
        table: 'Users',
        field: 'id'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      'ShoeTables',
      'user_id-fk-in-comments'
    )
  }
};
