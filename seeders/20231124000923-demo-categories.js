'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {category_name: 'Eletrônicos'},
      {category_name: 'Roupas'},
      {category_name: 'Livros'},
      {category_name: 'Móveis'},
      {category_name: 'Alimentos'}, 
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {})
  }
};
