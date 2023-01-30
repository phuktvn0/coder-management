import express from "express";
import createError from "http-errors";
import httpStatus from "http-status";
import {
  getAllTasksQuerySchema,
  createTaskQuerySchema,
  checkIdParamSchema,
  updatedTaskQuerySchema,
} from "./task.validators";
import Task from "../models/Task";
import { any } from "joi";

//Create a Task
export async function createTask(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { error, value } = createTaskQuerySchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      throw createError(httpStatus.BAD_REQUEST, error.message);
    }

    const created = await Task.create(value);
    const responseData = {
      data: {
        message: "Create Task Successfully!",
        task: created,
      },
    };
    res.status(200).send(responseData);
  } catch (err) {
    next(err);
  }
}

//Get all task
export async function getAllTasks(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { error, value } = getAllTasksQuerySchema.validate(req.query, {
      abortEarly: false,
    });
    if (error) {
      throw createError(httpStatus.BAD_REQUEST, error.message);
    }
    //mongoose query
    const { page, limit, ...filterValue } = value;

    let totalPages = 0;
    let listOfTask = [];

    listOfTask = await Task.find(filterValue);
    totalPages = Math.ceil(listOfTask.length / limit);

    const offset: number = limit * (page - 1);
    listOfTask = listOfTask.slice(offset, offset + limit);

    const responseData = {
      data: {
        message: "Get Task List Successfully!",
        user: listOfTask,
        page: page,
        total: totalPages,
      },
    };

    res.status(200).send(responseData);
  } catch (err) {
    next(err);
  }
}

//Update a Task
export async function updateTaskById(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { id } = req.params;

    const { error, value } = updatedTaskQuerySchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      throw createError(httpStatus.BAD_REQUEST, error.message);
    }

    const { idUser } = value;
    if (idUser) {
      const task = await Task.findById(id);
      if (!task) {
        throw createError(httpStatus.NOT_FOUND, " Task not found!");
      }
      // console.log(task.assignee == idUser);
      if (task.assignee == idUser) {
        task.assignee = null;
        task.save();
        const responseData = {
          data: {
            message: "Remove User Successfully!",
            task,
          },
        };
        return res.status(200).send(responseData);
      } else {
        task.assignee = idUser;
        task.save();
        const responseData = {
          data: {
            message: "Add User Successfully!",
            task,
          },
        };
        return res.status(200).send(responseData);
      }
    }

    const updated = await Task.findByIdAndUpdate(id, value, {
      new: true,
    });
    const responseData = {
      data: {
        message: "Update Task Successfully!",
        task: updated,
      },
    };
    return res.status(200).send(responseData);
  } catch (err) {
    next(err);
  }
}

//Delete task
export async function deleteTaskById(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { error, value } = checkIdParamSchema.validate(req.params);
    if (error) {
      throw createError(httpStatus.BAD_REQUEST, error.message);
    }
    const { id } = value;

    const findUser = await Task.findById(id);
    if (!findUser) {
      throw createError(httpStatus.NOT_FOUND, "User not exists!");
    }
    //mongoose query
    const target = await Task.findByIdAndDelete(id, { new: true });

    const responseData = {
      data: {
        message: "Delete Task Successfully!",
        task: target,
      },
    };
    res.status(200).send(responseData);
  } catch (err) {
    next(err);
  }
}
