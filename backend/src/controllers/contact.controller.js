const { Contact, Customer } = require("../models");
const { v4: uuidv4 } = require("uuid");
module.exports = {
  getAllContact: async (req, res) => {
    try {
      const contacts = await Contact.findAll({
        include: [
          {
            model: Customer,
            as: "customer",
            attributes: ["name"],
          },
        ],
      });
      res.status(200).json({
        status: "success",
        data: contacts,
        message: "All contacts retrieved successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  getContactById: async (req, res) => {
    const { id } = req.params;
    try {
      const contact = await Contact.findOne({
        where: { id },
        include: [
          {
            model: Customer,
            as: "customer",
            attributes: ["name"],
          },
        ],
      });

      res.status(200).json({
        status: "success",
        data: contact,
        message: "Contact retrieved By Id successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  createContact: async (req, res) => {
    const { customerId } = req.body;
    try {
      const contact = await Contact.create(
        {
          id: uuidv4(),
          customerId: customerId,
          ...req.body,
        },
        {
          include: [
            {
              model: Customer,
              as: "customer",
              attributes: ["name"],
            },
          ],
        }
      );
      res.status(201).json({
        status: "success",
        data: contact,
        message: "Contact created successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  updateContactById: async (req, res) => {
    const { id } = req.params;
    try {
      const contact = await Contact.findOne({
        where: { id },
      });

      await contact.update(req.body);
      res.status(200).json({
        status: "success",
        data: contact,
        message: "Contact updated successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  deleteContactById: async (req, res) => {
    const { id } = req.params;
    try {
      const contact = await Contact.findOne({
        where: { id },
      });

      await contact.destroy();
      res.status(200).json({
        status: "success",
        message: "Contact deleted successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};
