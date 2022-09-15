const express = require("express");
const app = express();
const Users = require("../models/Users");
const sendResponse = require("../middlewares/sendResponse");
const AppError = require("../utils/AppError");
const uniqid = require("uniqid");

const getAllUsers = async (req, res, next) => {
	try {
		let query = Users.find();
		query.then((data) => {
			return sendResponse(req, res, {
				statusCode: 200,
				message: "todo tasks in fetch",
				payload: data,
			});
		});
	} catch(err) {
		console.log("error message", err.message);
		return next(new AppError(400, "Bad request"));
	}
};

const getUser = async (req, res, next) => {
	const {
		params: { username },
	} = req;
	try {
		let user = await Users.find({ username });
		return sendResponse(req, res, {
			statusCode: 200,
			message: `user with username ${username}`,
			payload: user,
		});
	} catch (err) {
		console.log("error", err.message);
		return next(new AppError(500, " Error in fetching user"));
	}
};

const addUser = async(req,res,next)=>{
	const {
		body:{firstName, lastName, username,password,confirmPassword} 
	} = req
	if(password !== confirmPassword){
		return next(new AppError(409 , "Password Conflict"));
	}
	try{
		const newUser = new Users({id:uniqid(),firstName:firstName, lastName:lastName,username:username , password,password});
		console.log(newUser);
		await newUser.save();
		return sendResponse(req, res, {
			statusCode: 201,
			message: "User added sucessfully",
			payload: newUser,
		    });
	}catch(err){
		console.log(err.message);
		let errMessage = "Internal Server Error";
		if(err.message.split(" ")[0] === 'E11000'){
			errMessage="Username already taken"
		}
		else if(err.message.split(":")[0] === 'Users validation failed'){
			errMessage = err.message
		}
		return next(new AppError(500, errMessage ));
	}
}	

module.exports = {
	getUser,
	getAllUsers,
	addUser
};
