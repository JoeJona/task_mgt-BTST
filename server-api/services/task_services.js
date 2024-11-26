const DB_CON = require("../config/db");

// Get All Tasks
const getAllTasks = async (req, res) => {
    try {
      const Tasks = await DB_CON.query('Select * From tasktb Order By id');
      res.status(200).send({message: "All Tasks List", data: Tasks.rows});
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };

// Create Task
  const createTask = async (req, res) => {
    try {
        const {title, description, user_id} = req.body;
        const task = await DB_CON.query('Insert Into tasktb (title, description) Values ($1, $2) Returning *', [title, description]);
        res.status(201).send({message: "Task Created", data: task.rows});
      } catch (error) {
        res.status(500).send(error);
      }
  };

  // Get Task Info
  const getTask = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await DB_CON.query('Select * From tasktb Where id = $1', [id]);
        if(task.rowCount != 0) {
            res.status(200).send({message: "Task Detail Info", data: task.rows});
        } else {
            res.status(404).send({message: "Task not Found"});
        }
      } catch (error) {
        res.status(500).send(error);
      }
  };

  // Update Task
  const updateTask = async (req, res) => {
    try {
        const id = req.params.id;
        const {title, description, userId} = req.body;
        const task = await DB_CON.query('Select * From tasktb Where id = $1', [id]);
        if(task.rowCount != 0) {
            const updateTask = await DB_CON.query('Update tasktb Set title = $1, description = $2 Where id = $4 Returning *', [title, description, id]);
            res.status(200).send({message: "Task Updated", data: updateTask.rows});
        } else {
            res.status(404).send({message: "Task not Found"});
        }   
      } catch (error) {
        res.status(500).send(error);
      }
  };

  // Delete Task
  const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await DB_CON.query('Select * From tasktb Where id = $1', [id]);
        if(task.rowCount != 0) {
            await DB_CON.query('Delete From tasktb Where id = $1', [id]);
            res.status(200).send({message: "Task Deleted"});
        } else {
            res.status(404).send({message: "Task not Found"});
        }
      } catch (error) {
        res.status(500).send(error);
      }
  };

  // Assign Task
  const assignTask = async (req, res) => {
    try {
        const taskid = req.params.id;
        const {userid} = req.body;
        const task = await DB_CON.query('Select * From tasktb Where id = $1', [taskid]);
        const user = await DB_CON.query('Select * From usertb Where id = $1', [userid]);
        const assigned = await DB_CON.query('Select * From usertasktb Where userid = $1 And taskid = $2', [userid, taskid]);
        if(task.rowCount != 0 && user.rowCount) {
            if (assigned.rowCount == 0) {
              const user_task = await DB_CON.query('Insert Into usertasktb (taskid, userid) Values ($1, $2) Returning *', [taskid, userid]);
              res.status(200).send({message: "Task Assign", data: user_task.rows});
            } else {
              res.status(404).send({message: "Task already assigned"});
            }
        } else {
            res.status(404).send({message: "Task or User not Found"});
        }
      } catch (error) {
          res.status(500).send(error);
      }
  };

// Update Task Assignment
  const updateAssignTask = async (req, res) => {
    try {
        const id = req.params.id;
        const {userid} = req.body;
        const user = await DB_CON.query('Select * From usertb Where id = $1', [userid]);
        const assigned = await DB_CON.query('Select * From usertasktb Where id = $1', [id]);
        if (assigned.rowCount != 0) {
            if(user.rowCount != 0) {
              const user_task = await DB_CON.query('Update usertasktb Set userid = $1 Where id = $2 Returning *', [userid, id]);
              res.status(200).send({message: "Task Assign", data: user_task.rows});
            } else {
                res.status(404).send({message: "User not Found"});
            }
        } else {
          res.status(404).send({message: "Assigned Task Not Found"});
        }
      } catch (error) {
          res.status(500).send(error);
      }
  };

  module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
    assignTask,
    updateAssignTask
  };