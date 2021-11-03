import { getCustomRepository } from "typeorm";
import { UserReporitories } from "../repositories/UserRepositores";
import { hash } from "bcryptjs";

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

class CreateUserService {
  async execute({ name, email, admin = false, password }: IUserRequest) {
    const UserReporitory = getCustomRepository(UserReporitories);

    if (!email) {
      throw new Error("Invalid email!");
    }

    const userAlreadyExists = await UserReporitory.findOne({ email });

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const passwordHash = await hash(password, 8);

    const user = UserReporitory.create({
      name,
      email,
      admin,
      password: passwordHash,
    });
    await UserReporitory.save(user);

    return user;
  }
}
export { CreateUserService };
