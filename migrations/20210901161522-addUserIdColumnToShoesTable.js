'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('ShoeTables', 'user_id', {
      type: Sequelize.INTEGER
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('ShoeTables', 'user_id',)
  }
};
