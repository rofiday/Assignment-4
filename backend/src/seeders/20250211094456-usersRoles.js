"use strict";
const { User, Role } = require("../models");
const { v4: uuidv4 } = require("uuid");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await User.findAll({
      attributes: ["id"],
    });
    const roles = await Role.findAll({
      attributes: ["id"],
    });
    const usersRoles = users.map((user) => {
      return {
        id: uuidv4(),
        userId: user.id,
        roleId: roles[Math.floor(Math.random() * roles.length)].id,
      };
    });

    await queryInterface.bulkInsert("users_roles", usersRoles, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users_roles", null, {});
  },
};
