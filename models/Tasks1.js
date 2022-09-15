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
    //   default: uniqid(),
    },
    description: {
      type: String,
    //   required: [true, "Description cant be empty"],
    //   minLength: [
    //     4,
    //     "Description minimum length should be greater than 4 characters",
    //   ],
    },
    isComplete:{
        type: Boolean,
        // default: false
    },
//     status:{
//       type: String,
//       default: taskStatus.notStarted
//   },
  },
//   {
//     // _id: false,
//     timestamps:true,
//   },
  // { _id : false }
);

const Task1 = mongoose.model("Tasks1", TaskScehma);

module.exports = Task1;
