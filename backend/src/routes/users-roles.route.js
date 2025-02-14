const express = require("express");
const {
  getAllUsersRoles,
  getUserRoleById,
  createUserRole,
  updateUserRoleById,
  deleteUserRoleById,
} = require("../controllers/users-roles.controller");
const {
  middlewareGetUserRolesById,
  middlewareCreateUserRole,
  middlewareUpdateUserRolesById,
  middlewareDeleteUserRolesById,
} = require("../middlewares/users-roles.middleware");
const { middlewareGetAll } = require("../middlewares/helper.middleware");
const router = express.Router();

router.get("/", middlewareGetAll, getAllUsersRoles);
router.get("/:id", middlewareGetUserRolesById, getUserRoleById);
router.post("/", middlewareCreateUserRole, createUserRole);
router.put("/:id", middlewareUpdateUserRolesById, updateUserRoleById);
router.delete("/:id", middlewareDeleteUserRolesById, deleteUserRoleById);
module.exports = router;
