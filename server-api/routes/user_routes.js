const express = require("express");
const { getAllUsers, createUser, getUser, updateUser, deleteUser, getUserTasks, completeTask } = require("../services/user_services");
const router = express.Router();

router.get("/user/all", getAllUsers);
router.post("/user", createUser);
router.get("/user/:id", getUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
router.get("/user/:id/tasks", getUserTasks);
router.put("/user/task-complete/:id", completeTask);

module.exports = router