import express from "express";
import {
  createUser,
  getAllUsers,
  updateUserById,
  deleteUserById,
} from "../controllers/user.controllers";

const userRouter: express.Router = express.Router();

userRouter.get("/", getAllUsers);

userRouter.post("/", createUser);

userRouter.put("/:id", updateUserById);

userRouter.delete("/:id", deleteUserById);

export default userRouter;
