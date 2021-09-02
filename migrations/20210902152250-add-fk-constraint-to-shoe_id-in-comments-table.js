'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.addConstraint('Comments', {
      fields: ['shoe_id'],
      type: 'FOREIGN KEY',
      name: 'shoe_id-fk-in-comments',
      references: {
        table: 'ShoeTables',
        field: 'id'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {

    return queryInterface.removeConstraint(
      'Comments',
      'shoe_id-fk-in-comments'
    )
  }
};
