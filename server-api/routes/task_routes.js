const express = require("express");
const { getAllTasks, createTask, getTask, updateTask, deleteTask, assignTask, updateAssignTask } = require("../services/task_services");
const router = express.Router();

router.get("/task/all", getAllTasks);
router.post("/task", createTask);
router.get("/task/:id", getTask);
router.put("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);
router.post("/task/:id/assign", assignTask);
router.put("/task/update-assign/:id", updateAssignTask);

module.exports = router