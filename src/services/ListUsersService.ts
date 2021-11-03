import { getCustomRepository } from "typeorm";
import { UserReporitories } from "../repositories/UserRepositores";
import { classToPlain } from "class-transformer";

class ListUsersService {
  async execute() {
    const usersRepositorie = getCustomRepository(UserReporitories);

    const users = await usersRepositorie.find();
    return classToPlain(users);
  }
}

export { ListUsersService };
