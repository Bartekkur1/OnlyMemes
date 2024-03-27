import Joi from "joi";
import { Pagination } from "../../Types/Shared";
import { validate } from "./Shared";

export const validatePagination = (pagination: Pagination) => {
  const paginationSchema = Joi.object({
    page: Joi.number().min(1).required(),
    size: Joi.number().min(1).max(100).required()
  });

  return validate(pagination, paginationSchema);
};
