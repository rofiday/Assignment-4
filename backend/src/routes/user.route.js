const express = require("express");
const {
  getAllUser,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} = require("../controllers/user.controller");
const {
  middlewareGetUserById,
  middlewareCreateUser,
  middlewareUpdateUserById,
  middlewareDeleteUserById,
} = require("../middlewares/user.middleware");
const { middlewareGetAll } = require("../middlewares/helper.middleware");
const router = express.Router();

router.get("/", middlewareGetAll, getAllUser);
router.get("/:id", middlewareGetUserById, getUserById);
router.post("/", middlewareCreateUser, createUser);
router.put("/:id", middlewareUpdateUserById, updateUserById);
router.delete("/:id", middlewareDeleteUserById, deleteUserById);
module.exports = router;
