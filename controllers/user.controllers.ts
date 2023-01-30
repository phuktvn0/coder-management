import express from "express";
import User from "../models/User";
import createError from "http-errors";
import httpStatus from "http-status";
import {
  getAllUsersQuerySchema,
  createUserBodySchema,
  userIdParamSchema,
} from "./user.validators";
import { getCurrentDate } from "../helper";

//Create a User
export async function createUser(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { error, value } = createUserBodySchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      throw createError(httpStatus.BAD_REQUEST, error.message);
    }

    const created = await User.create({
      ...value,
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
    });
    const responseData = {
      data: {
        message: "Create User Successfully!",
        user: created,
      },
    };
    res.status(200).send(responseData);
  } catch (err) {
    // console.log(err);
    next(err);
  }
}

//Get all user
export async function getAllUsers(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { error, value } = getAllUsersQuerySchema.validate(req.query, {
      abortEarly: false,
    });
    if (error) {
      throw createError(httpStatus.BAD_REQUEST, error.message);
    }
    //mongoose query
    const { page, limit, ...filterValue } = value;

    let totalPages = 0;
    let listOfUser = [];

    listOfUser = await User.find(filterValue);
    // console.log(listOfUser);
    totalPages = Math.ceil(listOfUser.length / limit);

    const offset: number = limit * (page - 1);
    // console.log(offset);
    listOfUser = listOfUser.slice(offset, offset + limit);

    const responseData = {
      data: {
        message: "Get User List Successfully!",
        user: listOfUser,
        page: page,
        total: totalPages,
      },
    };

    res.status(200).send(responseData);
  } catch (err) {
    next(err);
  }
}

//Update a user
export async function updateUserById(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { id } = req.params;

    const { error, value } = createUserBodySchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      throw createError(httpStatus.BAD_REQUEST, error.message);
    }

    //mongoose query
    const updated = await User.findByIdAndUpdate(id, value, {
      new: true,
    });
    const responseData = {
      data: {
        message: "Update User Successfully!",
        user: updated,
      },
    };
    res.status(200).send(responseData);
  } catch (err) {
    next(err);
  }
}

//Delete user
export async function deleteUserById(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { error, value } = userIdParamSchema.validate(req.params);
    if (error) {
      throw createError(httpStatus.BAD_REQUEST, error.message);
    }
    const { id } = value;

    const findUser = await User.findById(id);
    if (!findUser) {
      throw createError(httpStatus.NOT_FOUND, "User not exists!");
    }
    //mongoose query
    const target = await User.findByIdAndDelete(id, { new: true });

    const responseData = {
      data: {
        message: "Delete User Successfully!",
        user: target,
      },
    };
    res.status(200).send(responseData);
  } catch (err) {
    next(err);
  }
}
