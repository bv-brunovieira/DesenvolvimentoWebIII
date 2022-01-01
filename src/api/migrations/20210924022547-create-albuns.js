'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Albuns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      cpf: {
        type: Sequelize.STRING
      },
      tel: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.STRING
      },
      cidade: {
        type: Sequelize.STRING
      },
      data_nascimento: {
        type: Sequelize.DATE
      },
      titulo_foto: {
        type: Sequelize.STRING
      },
      nome_fotografo: {
        type: Sequelize.STRING
      },
      nome_foto: {
        type: Sequelize.STRING
      },
      nome_responsavel: {
        type: Sequelize.STRING
      },
      cpf_responsavel: {
        type: Sequelize.STRING
      },
      data_autorizacao: {
        allowNull: false,
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Albuns');
  }
};