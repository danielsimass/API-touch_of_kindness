import { getCustomRepository } from "typeorm";
import { UserReporitories } from "../repositories/UserRepositores";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const userRepositories = getCustomRepository(UserReporitories);

    const user = await userRepositories.findOne({ email });
    if (!user) {
      throw new Error("Email/Password incorrect!");
    }
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Email/Password incorrect!");
    }
    const token = sign(
      {
        email: user.email,
      },
      "15ea78b53370b68dc5013b5e2ef026bd",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );
    return token;
  }
}

export { AuthenticateUserService };
