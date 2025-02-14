const Joi = require("joi");
const { UserRole } = require("../models");
const { Op } = require("sequelize");
module.exports = {
  middlewareGetUserRolesById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const userRole = await UserRole.findOne({
        where: { id },
      });
      if (!userRole) {
        return res.status(400).json({
          status: "error",
          message: "User-Role not found",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  middlewareCreateUserRole: async (req, res, next) => {
    const { userId, roleId } = req.body;
    try {
      const schema = Joi.object({
        userId: Joi.string().required(),
        roleId: Joi.string().required(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: "error",
          message: error.details[0].message,
        });
      }
      const userRole = await UserRole.findOne({
        where: {
          [Op.or]: [{ userId: userId, roleId: roleId }],
        },
      });
      if (userRole) {
        return res.status(400).json({
          status: "error",
          message: "User-Role already exists",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  middlewareUpdateUserRolesById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const userRole = await UserRole.findOne({
        where: { id },
      });
      if (!userRole) {
        return res.status(400).json({
          status: "error",
          message: "User-Role not found",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  middlewareDeleteUserRolesById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const userRole = await UserRole.findOne({
        where: { id },
      });
      if (!userRole) {
        return res.status(400).json({
          status: "error",
          message: "User-Role not found",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};
