export class UserModel {
  constructor(
    readonly firstName: string,
    readonly lastName: string,
    readonly email: string,
    readonly password: string,
    readonly id: string | undefined
  ) {}
}
