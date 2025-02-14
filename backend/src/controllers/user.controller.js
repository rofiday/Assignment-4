const { User, UserRole, Role, sequelize } = require("../models");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { generateRandomCharacter } = require("../helper/helper");
module.exports = {
  getAllUser: async (req, res) => {
    try {
      const user = await User.findAll({
        include: [
          {
            model: Role,
            as: "roles",
            attributes: ["roleName"],
          },
        ],
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json({
        status: "success",
        data: user,
        message: "All users retrieved successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      await User.findOne({
        where: { id },
      });
      res.status(200).json({
        status: "success",
        message: "User retrieved By Id successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  createUser: async (req, res) => {
    const { username, email, roleName } = req.body;
    let password = generateRandomCharacter(10);
    let transaction;
    try {
      transaction = await sequelize.transaction();
      password = await bcrypt.hash(password, 10);
      const user = await User.create(
        {
          id: uuidv4(),
          username: username,
          email: email,
          password: password,
        },
        { transaction }
      );

      const role = await Role.findOne({
        where: { roleName },
        attributes: ["id", "roleName"],
      });
      console.log(role);

      await UserRole.create(
        {
          id: uuidv4(),
          userId: user.id,
          roleId: role.id,
        },
        { transaction }
      );
      await transaction.commit();
      res.status(201).json({
        status: "success",
        message: "User created successfully",
      });
    } catch (error) {
      if (transaction) await transaction.rollback();
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  updateUserById: async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
      console.log("ID", id);
      const user = await User.findOne({
        where: { id },
      });
      console.log(user);
      if (!user) {
        return res.status(400).json({
          status: "error",
          message: "User not found",
        });
      }
      await user.update({
        username: req.body.username,
        email: req.body.email,
      });
      const role = await Role.findOne({
        where: { roleName: req.body.roleName },
        attributes: ["id"],
      });
      await UserRole.update(
        {
          roleId: role.id,
        },
        {
          where: { userId: user.id },
        }
      );
      console.log(req.body);
      res.status(200).json({
        status: "success",
        data: user,
        message: "User updated successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  deleteUserById: async (req, res) => {
    const { id } = req.params;
    try {
      console.log(id);
      const user = await User.findOne({
        where: { id },
      });
      console.log(user);
      if (!user) {
        return res.status(400).json({
          status: "error",
          message: "User not found",
        });
      }
      await user.destroy();
      res.status(200).json({
        status: "success",
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};
