import express from "express";
import {
  createTask,
  getAllTasks,
  updateTaskById,
  deleteTaskById,
} from "../controllers/task.controllers";

const taskRouter: express.Router = express.Router();

taskRouter.get("/", getAllTasks);

taskRouter.post("/", createTask);

taskRouter.put("/:id", updateTaskById);

taskRouter.delete("/:id", deleteTaskById);

export default taskRouter;
