export interface UserController {
  create(input: Input): Promise<any>;
}

export type Input = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
