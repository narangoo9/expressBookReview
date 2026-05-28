const express = require("express");
const app = express();

const general = require("./final_project/router/general");
const auth = require("./final_project/router/auth_users");

app.use(express.json());

app.use("/", general);
app.use("/", auth);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});