const Joi = require("joi");
const { Log } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  middlewareGetLogById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const log = await Log.findOne({ where: { id } });
      if (!log) {
        return res.status(400).json({
          status: "error",
          message: "Log not found",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  middlewareCreateLog: async (req, res, next) => {
    try {
      const schema = Joi.object({
        userId: Joi.string().required(),
        customerId: Joi.string().required(),
        action: Joi.string().required(),
        details: Joi.string().required(),
        // Add other required fields with validations
      });
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: "error",
          message: error.details[0].message,
        });
      }
      // Check for redundant data if necessary
      const log = await Log.findOne({
        where: {
          [Op.and]: [
            { userId: req.body.userId },
            { customerId: req.body.customerId },
          ],
        },
      });
      if (log) {
        return res.status(400).json({
          status: "error",
          message: "Log already exists",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  middlewareUpdateLogById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const schema = Joi.object({
        userId: Joi.string().required(),
        customerId: Joi.string().required(),
        action: Joi.string().required(),
        details: Joi.string().required(),
        // Add other required fields with validations
      });
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: "error",
          message: error.details[0].message,
        });
      }
      const log = await Log.findOne({ where: { id } });
      if (!log) {
        return res.status(400).json({
          status: "error",
          message: "Log not found",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  middlewareDeleteLogById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const log = await Log.findOne({ where: { id } });
      if (!log) {
        return res.status(400).json({
          status: "error",
          message: "Log not found",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};
