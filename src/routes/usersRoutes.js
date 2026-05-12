import express from "express";
import {createUser, getUsers, deleteUser} from "../controllers/usersController.js";

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.get("/", getUsers);
userRouter.delete("/:id", deleteUser);

export default userRouter;