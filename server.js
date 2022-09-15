// connection to db
// start app

const mongoose = require("mongoose");
const Task = require("./models/Task");
const dotenv = require("dotenv");
const app = require("./app");
const sendErrorResponse = require("./middlewares/sendErrorResponse");
dotenv.config();
const { DB_LOCAL, PORT } = process.env;

app.use(sendErrorResponse);

mongoose
  .connect(DB_LOCAL, {})
  .then((connection) => {
    return app.listen(PORT || 3000, () => {
      console.log("server started on port", PORT);
    });
  })
  .catch((err) => {
    console.log("Error in connecting", err);
  });
