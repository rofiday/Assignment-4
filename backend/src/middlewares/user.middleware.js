const Joi = require("joi");
const { User } = require("../models");
const { Op } = require("sequelize");
module.exports = {
  middlewareGetUserById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await User.findOne({
        where: {
          id,
        },
      });
      if (!user) {
        return res.status(400).json({
          status: "error",
          message: "User not found",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  middlewareCreateUser: async (req, res, next) => {
    try {
      const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
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
      const user = await User.findOne({
        where: {
          [Op.or]: [{ username: req.body.username }, { email: req.body.email }],
        },
      });
      if (user) {
        return res.status(400).json({
          status: "error",
          message: "User already exists",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  middlewareUpdateUserById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        roleName: Joi.string().required(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: "error",
          message: error.details[0].message,
        });
      }
      const user = await User.findOne({ where: { id } });
      if (!user) {
        return res.status(400).json({
          status: "error",
          message: "User not found",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  middlewareDeleteUserById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await User.findOne({ where: { id } });
      if (!user) {
        return res.status(400).json({
          status: "error",
          message: "User not found",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};
