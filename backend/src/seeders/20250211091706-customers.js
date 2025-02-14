"use strict";

const { faker } = require("@faker-js/faker");
const { v4: uuidv4 } = require("uuid");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const customers = [];
    for (let i = 0; i < 100; i++) {
      customers.push({
        id: uuidv4(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
      });
    }
    await queryInterface.bulkInsert("customers", customers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("customers", null, {});
  },
};
