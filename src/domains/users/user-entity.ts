import { MissingParamError } from '../../shared/errors/missing-param-error';

import { EmailVO } from '../../shared/value-object/email-vo';
import { PasswordVO } from '../../shared/value-object/password-vo';
import { UniqueEntityIdVO } from '../../shared/value-object/unique-entity-id-vo';

export class User {
  private readonly _id: UniqueEntityIdVO;
  private readonly _firstName: string;
  private readonly _lastName: string;
  private readonly _email: EmailVO;
  private readonly _password: PasswordVO;

  constructor(
    id: string | undefined,
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    this._id = new UniqueEntityIdVO(id);
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = new EmailVO(email);
    this._password = new PasswordVO(password, 'AQUI POSSO APLICAR O ENCRYPTER DA QUE ESTÀ EM MINHA INFRA');

    this.validate();
  }

  private validate() {
    if (!this._firstName) throw new MissingParamError('First Name');
    if (!this._lastName) throw new MissingParamError('Last Name');
  }

  get id() {
    return this._id;
  }

  get email() {
    return this._email.value;
  }

  get fullName() {
    return `${this._firstName} ${this._lastName}`;
  }
}
