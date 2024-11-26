const DB_CON = require("../config/db");

// Get All Users
const getAllUsers = async (req, res) => {
    try {
      const users = await DB_CON.query('Select * From usertb Order By id');
      res.status(200).send({message: "All Users List", data: users.rows});
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };

// Create User
  const createUser = async (req, res) => {
    try {
        const {name, email} = req.body;
        const user = await DB_CON.query('Insert Into usertb (Name, Email) Values ($1, $2) Returning *', [name, email]);
        res.status(201).send({message: "User Created", data: user.rows});
      } catch (error) {
        res.status(500).send(error);
      }
  };

  // Get User Info
  const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await DB_CON.query('Select * From usertb Where id = $1', [id]);
        if(user.rowCount != 0) {
          res.status(200).send({message: "User Detail Info", data: user.rows});
      } else {
          res.status(404).send({message: "User not Found"});
      }
      } catch (error) {
        res.status(500).send(error);
      }
  };

  // Update User
  const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const {name, email} = req.body;
        const user = await DB_CON.query('Select * From usertb Where id = $1', [id]);
        if(user.rowCount != 0) {
          const updateUser = await DB_CON.query('Update usertb Set name = $1, email = $2 Where id = $3 Returning *', [name, email, id]);
          res.status(200).send({message: "User Updated", data: updateUser.rows});
      } else {
          res.status(404).send({message: "User not Found"});
      }     
      } catch (error) {
        res.status(500).send(error);
      }
  };

  // Delete User
  const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await DB_CON.query('Select * From usertb Where id = $1', [id]);
        if(user.rowCount != 0) {
          await DB_CON.query('Delete From usertb Where id = $1', [id]);
          res.status(200).send({message: "User Deleted"});
      } else {
          res.status(404).send({message: "User not Found"});
      }
      } catch (error) {
        res.status(500).send(error);
      }
  };

  // Get User's Tasks
  const getUserTasks = async (req, res) => {
    try {
        let usertasksList = [];
        let taskId;
        const id = req.params.id;
        const user = await DB_CON.query('Select * From usertb Where id = $1', [id]);
        if(user.rowCount != 0) {
          const usertasks = await DB_CON.query('Select * From usertasktb Where userid = $1', [id]);
          const alltasks = await DB_CON.query('Select * From tasktb');
          // usertasksList = usertasks.rows.filter((task) => task.userid == 6);
          // const taskslist = await DB_CON.query('Select * From tasktb Where userid = $1', [usertasks.rows]);
          usertasks.rows.forEach(e => {
            usertasksList.push(... alltasks.rows.filter((task) => task.id == e.taskid));
          });
          res.status(200).send({message: "User's Tasks List", data: usertasksList});
          
      } else {
          res.status(404).send({message: "User not Found"});
      }
      } catch (error) {
        res.status(500).send(error);
      }
  };

  // Complete Task Assigned
  const completeTask = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await DB_CON.query('Select * From tasktb Where id = $1', [id]);
        if (task.rowCount != 0) {
              const user_task = await DB_CON.query('Update tasktb Set is_completed = true Where id = $1 Returning *', [id]);
              res.status(200).send({message: "Task Complete", data: user_task.rows});
        } else {
          res.status(404).send({message: "Task Not Found"});
        }
      } catch (error) {
          res.status(500).send(error);
      }
  };

  module.exports = {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    getUserTasks,
    completeTask
  };