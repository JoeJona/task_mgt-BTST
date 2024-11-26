const express = require("express");
const cors = require("cors");
const DB_CON = require("./config/db");
const userRoutes = require("./routes/user_routes")
const taskRoutes = require("./routes/task_routes")

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", userRoutes);
app.use("/api", taskRoutes);

app.listen(5000, () => {
  DB_CON.connect().then(() => console.log("DB Connected"));
  console.log(`Backend Running at 5000`);
});
