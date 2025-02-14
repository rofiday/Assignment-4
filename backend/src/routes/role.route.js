const express = require("express");
const {
  getAllRole,
  getRoleById,
  createRole,
  updateRoleById,
  deleteRoleById,
} = require("../controllers/role.controller");
const {
  middlewareGetAllRole,
  middlewareGetRoleById,
  middlewareCreateRole,
  middlewareUpdateRole,
  middlewareDeleteRole,
} = require("../middlewares/role.middleware");
const { middlewareGetAll } = require("../middlewares/helper.middleware");
const router = express.Router();

router.get("/", middlewareGetAll, getAllRole);
router.get("/:id", middlewareGetRoleById, getRoleById);
router.post("/", middlewareCreateRole, createRole);
router.put("/:id", middlewareUpdateRole, updateRoleById);
router.delete("/:id", middlewareDeleteRole, deleteRoleById);
module.exports = router;
