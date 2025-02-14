"use strict";
const { v4: uuidv4 } = require("uuid");
const { Customer } = require("../models");
const { faker } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const customers = await Customer.findAll({
      attributes: ["id"],
    });
    const contacts = customers.map((customer) => ({
      id: uuidv4(),
      customerId: customer.id,
      contactType: ["email", "phone", "whatsapp"][
        Math.floor(Math.random() * 3)
      ],
      contactValue: [
        () => faker.internet.email(),
        () => faker.phone.number(),
        () => `+62${Math.floor(Math.random() * 100000000)}`,
      ][Math.floor(Math.random() * 3)](),
    }));
    await queryInterface.bulkInsert("contacts", contacts, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("contacts", null, {});
  },
};
