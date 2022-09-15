const {Router} = require("express");
const { getUser,getAllUsers, addUser} = require("../controller/usersController");

const usersRouter = Router();
usersRouter.route("/").get(getAllUsers).post(addUser)
usersRouter.route("/:username").get(getUser)
module.exports = usersRouter;