const Joi = require("joi");
const { Contact } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  middlewareContactById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const contact = await Contact.findOne({
        where: {
          id,
        },
      });
      if (!contact) {
        return res.status(400).json({
          status: "error",
          message: "Contact not found",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  middlewareCreateContact: async (req, res, next) => {
    const { customerId, contactType, contactValue } = req.body;
    try {
      const schema = Joi.object({
        customerId: Joi.string().required(),
        contactType: Joi.string().required(),
        contactValue: Joi.string().required(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: "error",
          message: error.details[0].message,
        });
      }
      const contact = await Contact.findOne({
        where: {
          [Op.or]: [
            { customerId: customerId },
            { contactType: contactType },
            { contactValue: contactValue },
          ],
        },
      });
      if (contact) {
        return res.status(400).json({
          status: "error",
          message: "Contact already exists",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  middlewareUpdateContactById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const schema = Joi.object({
        customerId: Joi.string().optional(),
        name: Joi.string().optional(),
        email: Joi.string().email().optional(),
        phone: Joi.string().optional(),
        address: Joi.string().optional(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: "error",
          message: error.details[0].message,
        });
      }
      const contact = await Contact.findOne({
        where: { id },
      });
      if (!contact) {
        return res.status(400).json({
          status: "error",
          message: "Contact not found",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  middlewareDeleteContactById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const contact = await Contact.findOne({
        where: { id },
      });
      if (!contact) {
        return res.status(400).json({
          status: "error",
          message: "Contact not found",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};
