const express = require("express");
const {
  getAllContact,
  getContactById,
  createContact,
  updateContactById,
  deleteContactById,
} = require("../controllers/contact.controller");
const { middlewareGetAll } = require("../middlewares/helper.middleware");
const {
  middlewareContactById,
  middlewareCreateContact,
  middlewareUpdateContactById,
  middlewareDeleteContactById,
} = require("../middlewares/contact.middleware");

const router = express.Router();

router.get("/", middlewareGetAll, getAllContact);
router.get("/:id", middlewareContactById, getContactById);
router.post("/", middlewareCreateContact, createContact);
router.put("/:id", middlewareUpdateContactById, updateContactById);
router.delete("/:id", middlewareDeleteContactById, deleteContactById);

module.exports = router;
