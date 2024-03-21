import { Request } from "express";
import { Pagination } from "../Types/Shared";

export const extractPagination = (req: Request): Pagination => {
  const page = Number(req.query.page) || 1;
  const size = Number(req.query.size) || 10;

  return { page, size };
};