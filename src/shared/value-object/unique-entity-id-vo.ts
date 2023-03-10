import { ObjectId } from 'mongodb';
import { InvalidUuidError } from '../errors/invalid-uuid-error';

export class UniqueEntityIdVO {
  private readonly _value: string | ObjectId;

  constructor(value?: string | ObjectId) {
    this._value = value ? new ObjectId(value) : new ObjectId();
    this.validate();
  }

  private validate() {
    const isValid = ObjectId.isValid(this._value);
    if (!isValid) throw new InvalidUuidError();
  }

  get value() {
    return this._value;
  }

  toString() {
    return this._value.toString();
  }
}
