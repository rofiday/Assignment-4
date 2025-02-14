const Joi = require("joi");
const { Address, Customer } = require("../models");
const { Op } = require("sequelize");
module.exports = {
  middlewareGetAddressById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const address = await Address.findOne({
        where: {
          id,
        },
      });
      if (!address) {
        return res.status(400).json({
          status: "error",
          message: "Address not found",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  middlewareCreateAddress: async (req, res, next) => {
    try {
      const schema = Joi.object({
        customerId: Joi.string().required(),
        street: Joi.string().allow(null, "").required(),
        city: Joi.string().allow(null, "").required(),
        province: Joi.string().required(),
        postalCode: Joi.string().required(),
        country: Joi.string().required(),
      });
      console.log(schema.city);
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: "error",
          message: error.details[0].message,
        });
      }
      //melakukan validasi untuk data redundan
      const address = await Address.findOne({
        where: {
          [Op.or]: [
            { customerId: req.body.customerId },
            { street: req.body.street },
            { city: req.body.city },
            { province: req.body.province },
            { postalCode: req.body.postalCode },
            { country: req.body.country },
          ],
        },
      });
      if (address) {
        return res.status(400).json({
          status: "error",
          message: "Address already exists",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  middlewareUpdateAddress: async (req, res, next) => {
    const { id } = req.params;
    try {
      const schema = Joi.object({
        customerId: Joi.string().required(),
        street: Joi.string().required(),
        city: Joi.string().required(),
        province: Joi.string().required(),
        postalCode: Joi.string().required(),
        country: Joi.string().required(),
      });
      console.log(schema);
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: "error",
          message: error.details[0].message,
        });
      }
      const address = await Address.findOne({ where: { id } });
      if (!address) {
        return res.status(400).json({
          status: "error",
          message: "Address not found",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  middlewareDeleteAddress: async (req, res, next) => {
    const { id } = req.params;
    try {
      const address = await Address.findOne({ where: { id } });
      if (!address) {
        return res.status(400).json({
          status: "error",
          message: "Address not found",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};
