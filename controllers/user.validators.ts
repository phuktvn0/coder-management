import Joi from "joi";

export const getAllUsersQuerySchema = Joi.object({
  page: Joi.number().default(1),
  limit: Joi.number().default(10),
  name: Joi.string().uppercase().trim(),
  _id: Joi.string().hex().length(24),
  status: Joi.string()
    .uppercase()
    .valid("PENDING", "WORKING", "REVIEW", "DONE", "ARCHIVE")
    .trim(),
});

export const createUserBodySchema = Joi.object({
  name: Joi.string().uppercase().trim().required(),
  role: Joi.string().default("employee"),
  _id: Joi.string().hex().length(24),
  status: Joi.string()
    .default("PENDING")
    .uppercase()
    .trim()
    .valid("PENDING", "WORKING", "REVIEW", "DONE", "ARCHIVE")
    .required(),
});

export const userIdParamSchema = Joi.object({
  id: Joi.string().hex().length(24),
});
