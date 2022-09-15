const uniqid = require("uniqid");
const mongoose = require("mongoose");

const UsersScehma = mongoose.Schema(
  {
    UserId: {
      type: String,
      default: uniqid(),
    },
    firstName: {
      type: String,
      required: [true, "FirstName cannot be empty"],
      minLength: [
        2,
        "FirstName too short to process (2characters)",
      ],
    },
    lastName: {
      type: String,
      required: [true, "LastName cannot be empty"],
      minLength: [
        2,
        "LastName too short to process (2characters)",
      ],
    },
    username: {
      type: String,
      required: [true, "Username cannot be empty"],
      minLength: [
        4,
        "username too short to process (4characters)",
      ],
	unique : true
    },
    password: {
      type: String,
      required: [true, "password cannot be empty"],
      minLength: [
        4,
        "Password too short to process (4characters)",
      ],
    },
  },
  {
    timestamps:true,
  },
);

const Users = mongoose.model("Users", UsersScehma);

module.exports = Users;
