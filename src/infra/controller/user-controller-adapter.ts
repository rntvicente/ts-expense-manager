import { CreateUser } from '../../application/use-cases/create-user';
import {
  Input,
  UserController
} from '../../application/constroller/user-constroller';

export class UserControllerAdapter implements UserController {
  constructor(private readonly createUser: CreateUser) {}

  async create(input: Input): Promise<string> {
    return await this.createUser.execute(input);
  }
}
