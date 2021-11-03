import { Request, Response } from "express";
import { ListUsersService } from "../services/ListUsersService";

class ListUsersController {
  async handle(request: Request, response: Response) {
    const listUsersService = new ListUsersService();
    const user = await listUsersService.execute();

    return response.json(user);
  }
}
export { ListUsersController };
