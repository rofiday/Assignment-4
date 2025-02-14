const { Role } = require("../models");
const { v4: uuidv4 } = require("uuid");
module.exports = {
  getAllRole: async (req, res) => {
    try {
      const role = await Role.findAll();
      res.status(200).json({
        status: "success",
        data: role,
        message: "All roles retrieved successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  getRoleById: async (req, res) => {
    const { id } = req.params;
    try {
      const role = await Role.findOne({
        where: {
          id,
        },
      });
      if (!role) {
        return res.status(400).json({
          status: "error",
          message: "Role not found",
        });
      }
      res.status(200).json({
        status: "success",
        data: role,
        message: "Role retrieved By Id successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  createRole: async (req, res) => {
    try {
      const role = await Role.create({
        id: uuidv4(),
        ...req.body,
      });
      res.status(201).json({
        status: "success",
        data: role,
        message: "Role created successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  updateRoleById: async (req, res) => {
    const { id } = req.params;
    try {
      const role = await Role.findOne({
        where: {
          id,
        },
      });
      if (!role) {
        return res.status(400).json({
          status: "error",
          message: "Role not found",
        });
      }
      await role.update(req.body);
      res.status(200).json({
        status: "success",
        data: role,
        message: "Role updated successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  deleteRoleById: async (req, res) => {
    const { id } = req.params;
    try {
      const role = await Role.findOne({
        where: {
          id,
        },
      });
      if (!role) {
        return res.status(400).json({
          status: "error",
          message: "Role not found",
        });
      }
      await role.destroy();
      res.status(200).json({
        status: "success",
        message: "Role deleted successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};
