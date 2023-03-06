import { isValidEmail } from '@brazilian-utils/brazilian-utils';

import InvalidError from '../../shared/errors/invalid-field-error';

export class EmailVO {
  private readonly _value: string;

  constructor(email: string) {
    this._value = email;
    this.validate();
  }

  private validate() {
    const isValid = isValidEmail(this._value);
    if (!isValid) throw new InvalidError('E-mail');
  }

  get value() {
    return this._value;
  }
}
