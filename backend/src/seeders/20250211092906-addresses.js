"use strict";

const { faker } = require("@faker-js/faker");
const { v4: uuidv4 } = require("uuid");
const { Customer } = require("../models");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const customers = await Customer.findAll({
      attibutes: ["id"],
    });
    const addresses = [];
    for (const customer of customers) {
      addresses.push({
        id: uuidv4(),
        customerId: customer.id,
        street: faker.location.street(),
        city: faker.location.city(),
        postalCode: faker.location.zipCode(),
        province: faker.location.state(),
        country: faker.location.country(),
      });
    }
    await queryInterface.bulkInsert("addresses", addresses, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("addresses", null, {});
  },
};
