const { Customer } = require("../models");
const { v4: uuidv4 } = require("uuid");
module.exports = {
  getAllCustomers: async (req, res) => {
    try {
      const customer = await Customer.findAll({
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json({
        status: "success",
        data: customer,
        message: "All customers retrieved successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  getCustomerById: async (req, res) => {
    const { id } = req.params;
    try {
      const customer = await Customer.findOne({
        where: {
          id,
        },
      });

      res.status(200).json({
        status: "success",
        data: customer,
        message: "Customer retrieved By Id successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  createCustomer: async (req, res) => {
    try {
      const customer = await Customer.create({
        id: uuidv4(),
        ...req.body,
      });
      res.status(201).json({
        status: "success",
        data: customer,
        message: "Customer created successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  updateCustomerById: async (req, res) => {
    const { id } = req.params;
    try {
      const customer = await Customer.findOne({
        where: {
          id,
        },
      });

      //code ini dibuat karena tidak disimpan kevariable dan updatenya langsung ngambil dari body
      await customer.update(req.body);
      res.status(200).json({
        status: "success",
        data: customer,
        message: "Customer updated successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  deleteCustomerByid: async (req, res) => {
    const { id } = req.params;
    try {
      console.log(id);
      const customer = await Customer.findOne({
        where: { id },
      });
      console.log(customer);

      await customer.destroy();
      res.status(200).json({
        status: "success",
        message: "Customer deleted successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};
