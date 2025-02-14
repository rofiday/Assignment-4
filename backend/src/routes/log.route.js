const express = require("express");
const {
  getAllLogs,
  getLogById,
  createLog,
  updateLogById,
  deleteLogById,
} = require("../controllers/log.controller");
const { middlewareGetAll } = require("../middlewares/helper.middleware");
const {
  middlewareGetLogById,
  middlewareCreateLog,
  middlewareUpdateLogById,
  middlewareDeleteLogById,
} = require("../middlewares/log.middleware");
const router = express.Router();

router.get("/", middlewareGetAll, getAllLogs);
router.get("/:id", middlewareGetLogById, getLogById);
router.post("/", middlewareCreateLog, createLog);
router.put("/:id", middlewareUpdateLogById, updateLogById);
router.delete("/:id", middlewareDeleteLogById, deleteLogById);
module.exports = router;
