const express = require("express");
const {
  getAllAddress,
  getAddressById,
  createAddress,
  updateAddressById,
  deleteAddressById,
} = require("../controllers/address.controller");
const {
  middlewareGetAddressById,
  middlewareCreateAddress,
  middlewareUpdateAddress,
  middlewareDeleteAddress,
} = require("../middlewares/address.middleware");
const { middlewareGetAll } = require("../middlewares/helper.middleware");
const router = express.Router();

router.get("/", middlewareGetAll, getAllAddress);
router.get("/:id", middlewareGetAddressById, getAddressById);
router.post("/", middlewareCreateAddress, createAddress);
router.put("/:id", middlewareUpdateAddress, updateAddressById);
router.delete("/:id", middlewareDeleteAddress, deleteAddressById);

module.exports = router;
