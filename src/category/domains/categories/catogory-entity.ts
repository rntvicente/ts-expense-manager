import { MissingParamError } from '../../../shared/errors/missing-param-error';
import { UniqueEntityIdVO } from '../../../shared/value-object/unique-entity-id-vo';

export class Category {
  constructor(readonly id: UniqueEntityIdVO, readonly description: string) {}

  static create(description: string, id?: string) {
    if (!description) throw new MissingParamError('Description');

    return new Category(new UniqueEntityIdVO(id), description);
  }
}
