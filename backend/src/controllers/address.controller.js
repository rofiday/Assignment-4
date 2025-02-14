const { Address, Customer } = require("../models");
const { v4: uuidv4 } = require("uuid");
module.exports = {
  getAllAddress: async (req, res) => {
    try {
      const address = await Address.findAll({
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
        data: address,
        message: "Address retrieved successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  getAddressById: async (req, res) => {
    const { id } = req.params;
    try {
      const address = await Address.findOne({
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
        data: address,
        message: "Address retrieved By Id successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  createAddress: async (req, res) => {
    try {
      const address = await Address.create({
        id: uuidv4(),
        customerId: req.body.customerId,
        ...req.body,
      });
      res.status(200).json({
        status: "success",
        data: address,
        message: "Address created successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  updateAddressById: async (req, res) => {
    const { id } = req.params;
    try {
      const address = await Address.findOne({
        where: { id },
        include: [
          {
            model: Customer,
            as: "customer",
            attributes: ["name"],
          },
        ],
      });
      await address.update(req.body);
      res.status(200).json({
        status: "success",
        data: address,
        message: "Address Updated Successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  deleteAddressById: async (req, res) => {
    const { id } = req.params;
    try {
      const address = await Address.findOne({
        where: { id },
      });
      await address.destroy();
      res.status(200).json({
        status: "success",
        message: "Address Deleted Successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};
