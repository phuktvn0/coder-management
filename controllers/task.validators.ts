import Joi from "joi";

export const getAllTasksQuerySchema = Joi.object({
  page: Joi.number().default(1),
  limit: Joi.number().default(10),
  name: Joi.string().uppercase().trim(),
  description: Joi.string().uppercase().trim(),
  assignee: Joi.string().hex().length(24),
});

export const createTaskQuerySchema = Joi.object({
  name: Joi.string().uppercase().trim().required(),
  description: Joi.string().uppercase().trim().required(),
  assignee: Joi.string().hex().length(24),
});

export const updatedTaskQuerySchema = Joi.object({
  name: Joi.string().uppercase().trim(),
  description: Joi.string().uppercase().trim(),
  idUser: Joi.string().hex().length(24),
});

export const checkIdParamSchema = Joi.object({
  id: Joi.string().hex().length(24),
});
