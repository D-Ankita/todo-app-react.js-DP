// // create a schema
// 1.create a schema that defines a structure
// 2.create a model that will use the schema
// // export a model
const uniqid = require("uniqid");
const mongoose = require("mongoose");

const taskStatus ={
  notStarted : "NotStarted",
  processing :"Processing",
  blocked:"Blocked",
  completed:"Completed"
}

const TaskScehma = mongoose.Schema(
  {
    id: {
      type: String,
      default: uniqid(),
    },
    description: {
      type: String,
      required: [true, "Description cant be empty"],
      minLength: [
        4,
        "Description too short to process (4characters)",
      ],
    },
    isComplete:{
        type: Boolean,
        default: false
    },
    status:{
      type: String,
      default: taskStatus.notStarted
  },
  },
  {
    // _id: false,
    timestamps:true,
  },
  // { _id : false }
);

const Task = mongoose.model("Tasks", TaskScehma);

module.exports = Task;
