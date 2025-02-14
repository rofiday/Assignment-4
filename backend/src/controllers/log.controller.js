const { Log, User, Customer } = require("../models");
const { v4: uuidv4 } = require("uuid");
module.exports = {
  getAllLogs: async (req, res) => {
    try {
      const logs = await Log.findAll({
        include: [
          {
            model: User,
            as: "user",
            attributes: ["username"],
          },
          {
            model: Customer,
            as: "customers",
            attributes: ["name"],
          },
        ],
      });
      res.status(200).json({
        status: "success",
        data: logs,
        message: "All logs retrieved successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  getLogById: async (req, res) => {
    const { id } = req.params;
    try {
      const log = await Log.findOne({
        where: { id },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["username"],
          },
          {
            model: Customer,
            as: "customer",
            attributes: ["name"],
          },
        ],
      });

      res.status(200).json({
        status: "success",
        data: log,
        message: "Log retrieved By Id successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  createLog: async (req, res) => {
    const { customerId, userId } = req.body;
    try {
      const log = await Log.create({
        id: uuidv4(),
        customerId: customerId,
        userId: userId,
        ...req.body,
      });
      res.status(201).json({
        status: "success",
        data: log,
        message: "Log created successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  updateLogById: async (req, res) => {
    const { id } = req.params;
    try {
      const log = await Log.findOne({
        where: { id },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["username"],
          },
          {
            model: Customer,
            as: "customer",
            attributes: ["name"],
          },
        ],
      });

      await log.update(req.body);
      res.status(200).json({
        status: "success",
        data: log,
        message: "Log updated successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },

  deleteLogById: async (req, res) => {
    const { id } = req.params;
    try {
      const log = await Log.findOne({ where: { id } });
      await log.destroy();
      res.status(200).json({
        status: "success",
        message: "Log deleted successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};
