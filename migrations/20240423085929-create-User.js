'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let transaction;
    try {
       transaction = await queryInterface.sequelize.transaction();
      await queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        firstname: {
          type: Sequelize.STRING,
          allowNull: false
        },
        lastname: {
          type: Sequelize.STRING,
          allowNull: false
        },
        age: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        gender: {
          type: Sequelize.STRING,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }, { transaction });
      await queryInterface.addColumn('Users', 'contact', {
        type: Sequelize.INTEGER,
        allowNull: false
      }, { transaction });
      await transaction.commit();
      // return Promise.resolve();
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
