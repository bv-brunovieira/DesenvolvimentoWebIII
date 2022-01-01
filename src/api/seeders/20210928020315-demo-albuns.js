'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Albuns', [{
      nome: req.body.nome,
      cpf: req.body.cpf,
      tel: req.body.telefone,
      email: req.body.email,
      estado: req.body.estado,
      cidade: req.body.cidade,
      data_nascimento: Data.parse(req.body.dataNascimento),
      titulo_foto: req.body.titulo,
      nome_fotografo: req.body.nomeFotogra,
      nome_foto: req.body.foto,
      nome_responsavel: req.body.nomeresp,
      cpf_responsavel: req.body.cpfresp,
      data_autorizacao: new Date(),      
      createdAt: new Date(),
      updatedAt: new Date()

    }], {});

  },
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
