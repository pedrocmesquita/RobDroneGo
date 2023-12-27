import { Repo } from "../../core/infra/Repo";
import { User } from "../../domain/User/user";
import { UserEmail } from "../../domain/User/userEmail";

export default interface IUserRepo extends Repo<User> {
	save(user: User): Promise<User>;
	findByEmail (email: UserEmail | string): Promise<User>;
	findById (id: string): Promise<User>;
	deleteById (email: string): Promise<void>;
}
  