const Joi = require("joi");
const { Role } = require("../models");
const { Op } = require("sequelize");
module.exports = {
  middlewareGetRoleById: async (req, res, next) => {
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
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  middlewareCreateRole: async (req, res, next) => {
    try {
      const schema = Joi.object({
        roleName: Joi.string().required(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: "error",
          message: error.details[0].message,
        });
      }
      //melakukan validasi untuk data redundan
      const role = await Role.findOne({
        where: {
          [Op.or]: [{ roleName: req.body.roleName }],
        },
      });
      if (role) {
        return res.status(400).json({
          status: "error",
          message: "Role already exists",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  middlewareUpdateRole: async (req, res, next) => {
    const { id } = req.params;
    try {
      const schema = Joi.object({
        roleName: Joi.string().required(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: "error",
          message: error.details[0].message,
        });
      }
      const role = await Role.findOne({ where: { id } });
      if (!role) {
        return res.status(400).json({
          status: "error",
          message: "Role not found",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  middlewareDeleteRole: async (req, res, next) => {
    const { id } = req.params;
    try {
      const role = await Role.findOne({ where: { id } });
      if (!role) {
        return res.status(400).json({
          status: "error",
          message: "Role not found",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};
