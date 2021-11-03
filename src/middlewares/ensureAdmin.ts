import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { UserReporitories } from "../repositories/UserRepositores";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { user_id } = request;

  const usersReposiories = getCustomRepository(UserReporitories);

  const { admin } = await usersReposiories.findOne(user_id);
  console.log(admin);

  if (admin) {
    return next();
  }
  return response.status(401).json({ error: "Unauthorized." });
}
