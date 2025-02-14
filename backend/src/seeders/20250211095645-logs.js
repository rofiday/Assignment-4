"use strict";

const { faker } = require("@faker-js/faker");
const { v4: uuidv4 } = require("uuid");
const { User, Customer } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await User.findAll({ attributes: ["id"] });
    const customers = await Customer.findAll({ attributes: ["id"] });
    const logs = [];

    for (let i = 0; i < 100; i++) {
      logs.push({
        id: uuidv4(),
        userId: users[Math.floor(Math.random() * users.length)].id,
        customerId: customers[Math.floor(Math.random() * customers.length)].id,
        action: faker.lorem.words(3),
        details: faker.lorem.sentence(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("logs", logs, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("logs", null, {});
  },
};
