const express = require("express");
const {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomerById,
  deleteCustomerByid,
} = require("../controllers/customer.controller");
const {
  middlewareGetCustomerById,
  middlewareCreateCustomer,
  middlewareUpdateCustomer,
  middlewareDeleteCustomer,
} = require("../middlewares/customer.middleware");
const { middlewareGetAll } = require("../middlewares/helper.middleware");
const router = express.Router();

router.get("/", middlewareGetAll, getAllCustomers);
router.get("/:id", middlewareGetCustomerById, getCustomerById);
router.post("/", middlewareCreateCustomer, createCustomer);
router.put("/:id", middlewareUpdateCustomer, updateCustomerById);
router.delete("/:id", middlewareDeleteCustomer, deleteCustomerByid);
module.exports = router;
