import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/User";

@EntityRepository(User)
class UserReporitories extends Repository<User> {}

export { UserReporitories };
