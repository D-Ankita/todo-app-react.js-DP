const express = require("express");
const cors = require("cors")
const todoRouter = require("./routes/todoRouter");
const usersRouter = require("./routes/usersRouter");
const sendErrorResponse = require("./middlewares/sendErrorResponse");

// dotenv.config();

const app = express();

app.use(cors());
app.use(sendErrorResponse);
app.use(express.json());

app.use("/todos",todoRouter);
app.use("/users",usersRouter);




// app.get("*",(req,res)=>{
//     res.status(404).json({message : "Data not found"})
// })

// app.listen(process.env.PORT || 3000 , ()=>{
//     console.log("server running on port",process.env.PORT);
// }) 

module.exports = app;
