const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const uniqid = require("uniqid");
const Task = require("../models/Task");
const sendResponse = require("../middlewares/sendResponse");
const AppError = require("../utils/AppError");

const getSpecificTasks = async (req, res, next) => {
  let {
    query: { page, limit, ...otherProps },
  } = req;

  if (!limit) {
    limit = 25;
  }
  try {
    let totalPages = Math.ceil(
      (await Task.find({ ...otherProps })).length / limit
    );
  
    console.log("totalpages",totalPages);
    // if (!totalPages) {
    //   return next(new AppError(404, "Page not found"));
    // }
  
    if (!page) {
      page = !totalPages?1:totalPages;
      console.log("Page:",page);
    }
    if (page > totalPages && totalPages) {
      page=totalPages;
      // return next(new AppError(500, "No result found"));
    }

    let query = Task.find({...otherProps}).sort({$natural:-1}).skip(page * limit -limit).limit(limit)
   
    query.then((data)=>{
      return sendResponse(req, res, {
        statusCode: 200,
        message: "todo tasks in fetch",
        // payload: [data,totalPages]
        payload: data,
        totalPages:totalPages
      });
    })
  } catch (err) {
    console.log("error message", err.message);
    return next(new AppError(400, "Bad request"));
  }
};

// Route params
const getAllTasks = async (req, res, next) => {
  try {
    let tasks = await Task.find().select("-__v -_id");
    return sendResponse(req, res, {
      statusCode: 200,
      message: "Tasks",
      payload: [...tasks],
    });
  } catch (err) {
    console.log("error", err.message);
    return next(new AppError(500, " Error in fetching tasks"));
  }
};

const getSingleTask = async (req, res, next) => {
  const {
    params: { id },
  } = req;

  return sendResponse(req, res, {
    statusCode: 200,
    message: `task with id ${id}`,
    payload: req.task,
  });
};

const addTask = async (req, res, next) => {
  const {
    body: { description },
  } = req;
  try {
    const newTask = new Task({ id: uniqid(), description: description });
    console.log("new task", newTask);
    await newTask.save();
    return sendResponse(req, res, {
      statusCode: 201,
      message: "Todo added sucessfully",
      payload: newTask,
    });
  } catch (err) {
    console.log(err.message);
    return next(new AppError(500, "internal error operation"));
  }
};

const deleteTask = async (req, res, next) => {
  const {
    params: { id },
  } = req;
 
  try {
    await Task.deleteOne({ id: id });
    return sendResponse(req, res, {
      statusCode: 200,
      message: `todo with id ${id} deleted`,
      payload: "",
    });
  } catch (err) {
    console.log(err.message);
    return next(new AppError(500, "internal error operation"));
  }
};

const updateTask = async (req, res, next) => {
  console.log("in update task");
  const { body: updateObject } = req;
  console.log("body:",updateObject);
  const {
    params: { id },
  } = req;

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { id: id },
      {
        $set: {
          description: updateObject.description,
          isComplete: updateObject.isComplete,
        },
      }, 
      { new: true }
    );

    return sendResponse(req, res, {
      statusCode: 200,
      message: `todo with id ${id} updated`,
      payload: updatedTask,
    });
  } catch (err) {
    return next(new AppError(500, "internal error operation"));
  }
};
module.exports = {
  getSpecificTasks,
  addTask,
  getSingleTask,
  deleteTask,
  updateTask,
};
