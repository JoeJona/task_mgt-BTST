const Pool = require("pg").Pool;

// Database Connection
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: "5432",
  password: "5687",
  database: "taskmgtDB"
});

module.exports = pool;