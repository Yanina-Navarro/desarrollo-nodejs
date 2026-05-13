import express from "express";
import {createUser, getUsers, deleteUser, updateUser} from "../controllers/usersController.js";

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.get("/", getUsers);
userRouter.delete("/:id", deleteUser);
userRouter.put("/:id", updateUser);

export default userRouter;