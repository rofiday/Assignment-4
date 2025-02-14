const { User, Role, UserRole } = require("../models");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  getAllUsersRoles: async (req, res) => {
    try {
      const usersRoles = await UserRole.findAll({
        // include: [
        //   {
        //     model: Role,
        //     as: "roles",
        //     attributes: ["roleName"],
        //     through: { attributes: ["id"] },
        //   },
        // ],
        // attributes: { exclude: ["password"] },
      });
      res.status(200).json({
        status: "success",
        data: usersRoles,
        message: "All users-roles retrieved successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  getUserRoleById: async (req, res) => {
    const { id } = req.params;
    try {
      const usersRoles = await UserRole.findOne({
        where: { id },
      });
      res.status(200).json({
        status: "success",
        data: usersRoles,
        message: "User-Role retrieved by id successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  createUserRole: async (req, res) => {
    const { userId, roleId } = req.body;
    try {
      console.log("userId: ", userId);
      console.log("roleId: ", roleId);
      const usersRoles = await UserRole.create({
        id: uuidv4(),
        userId: userId,
        roleId: roleId,
      });
      res.status(201).json({
        status: "success",
        data: usersRoles,
        message: "User-Role created successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  updateUserRoleById: async (req, res) => {
    const { id } = req.params;
    try {
      const usersRoles = await UserRole.findOne({
        where: { id },
      });

      await usersRoles.update(req.body);
      res.status(200).json({
        status: "success",
        data: usersRoles,
        message: "User-Role updated successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  deleteUserRoleById: async (req, res) => {
    const { id } = req.params;
    try {
      const usersRoles = await UserRole.findOne({
        where: { id },
      });

      await usersRoles.destroy();
      res.status(200).json({
        status: "success",
        message: "User-Role deleted successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};
