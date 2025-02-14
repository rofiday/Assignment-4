const Joi = require("joi");
const { Customer } = require("../models");
const { Op } = require("sequelize");
module.exports = {
  middlewareGetCustomerById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const customer = await Customer.findOne({
        where: {
          id,
        },
      });
      if (!customer) {
        return res.status(400).json({
          status: "error",
          message: "Customer not found",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  middlewareCreateCustomer: async (req, res, next) => {
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.string().required(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: "error",
          message: error.details[0].message,
        });
      }
      //melakukan validasi untuk data redundan
      const customer = await Customer.findOne({
        where: {
          [Op.or]: [
            { name: req.body.name },
            { email: req.body.email },
            { phoneNumber: req.body.phoneNumber },
          ],
        },
      });
      if (customer) {
        return res.status(400).json({
          status: "error",
          message: "Customer already exists",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  middlewareUpdateCustomer: async (req, res, next) => {
    const { id } = req.params;
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.string().required(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: "error",
          message: error.details[0].message,
        });
      }
      const customer = await Customer.findOne({ where: { id } });
      if (!customer) {
        return res.status(400).json({
          status: "error",
          message: "Customer not found",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  middlewareDeleteCustomer: async (req, res, next) => {
    const { id } = req.params;
    try {
      const customer = await Customer.findOne({ where: { id } });
      if (!customer) {
        return res.status(400).json({
          status: "error",
          message: "Customer not found",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};
