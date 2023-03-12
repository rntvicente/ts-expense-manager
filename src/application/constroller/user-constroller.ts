export interface UserController {
  create(input: Input): Promise<string>;
}

export type Input = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
