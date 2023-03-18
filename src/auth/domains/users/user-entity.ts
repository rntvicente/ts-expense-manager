import { MissingParamError } from '../../../shared/errors/missing-param-error';

import { EmailVO } from '../../../shared/value-object/email-vo';
import { UniqueEntityIdVO } from '../../../shared/value-object/unique-entity-id-vo';
import { PasswordVO } from '../../../shared/value-object/password-vo';

export class User {
  constructor(
    readonly firstName: string,
    readonly lastName: string,
    readonly email: EmailVO,
    readonly password: PasswordVO,
    readonly id: UniqueEntityIdVO
  ) {}

  static async create(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    id?: string
  ) {
    if (!firstName) throw new MissingParamError('First Name');
    if (!lastName) throw new MissingParamError('Last Name');
    if (!password) throw new MissingParamError('Password');

    return new User(
      firstName,
      lastName,
      new EmailVO(email),
      await PasswordVO.create(password),
      new UniqueEntityIdVO(id)
    );
  }

  async validatePassword(password: string): Promise<boolean> {
    return this.password.validatePassword(password);
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
