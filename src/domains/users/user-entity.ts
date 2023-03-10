import { MissingParamError } from '../../shared/errors/missing-param-error';

import { EmailVO } from '../../shared/value-object/email-vo';
import { UniqueEntityIdVO } from '../../shared/value-object/unique-entity-id-vo';

export class User {
  private readonly _id: UniqueEntityIdVO;
  private readonly _firstName: string;
  private readonly _lastName: string;
  private readonly _email: EmailVO;
  private readonly _password: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    id?: string | undefined
  ) {
    this._id = new UniqueEntityIdVO(id);
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = new EmailVO(email);
    this._password = password;

    this.validate();
  }

  private validate() {
    if (!this._firstName) throw new MissingParamError('First Name');
    if (!this._lastName) throw new MissingParamError('Last Name');
    if (!this._password) throw new MissingParamError('Password');
  }

  get id() {
    return this._id;
  }

  get firstname() {
    return this._firstName;
  }

  get lastName() {
    return this._lastName;
  }

  get email() {
    return this._email.value;
  }

  get password() {
    return this._password;
  }

  get fullName() {
    return `${this._firstName} ${this._lastName}`;
  }
}
