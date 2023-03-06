import { ObjectId } from 'mongodb';

import { UniqueEntityIdVO } from '../../../../src/domains/value-object/unique-entity-id-vo';

describe('# Unique Entity ID Test Unit', () => {
  it('should throw error when invalid id', () => {
    jest.spyOn(ObjectId, 'isValid').mockReturnValueOnce(false);
    expect(() => new UniqueEntityIdVO()).toThrow(
      new Error('ID must be a valid UUID.')
    );
  });

  it('should create ObjectId when not informed param', () => {
    const objectId = new UniqueEntityIdVO();

    expect(ObjectId.isValid(objectId.toString())).toBeTruthy();
  });

  it('should accepted an ObjectId when informed', () => {
    const value = new ObjectId();
    const result = new UniqueEntityIdVO(value);

    expect(ObjectId.isValid(result.value)).toBeTruthy();
    expect(result.value).toBeInstanceOf(ObjectId);
    expect(result.toString()).toStrictEqual(value.toString());
  });

  it('should accepted a hex when informed', () => {
    const value = new ObjectId().toString('hex');
    const result = new UniqueEntityIdVO(value);

    expect(ObjectId.isValid(result.value)).toBeTruthy();
    expect(result.value).toBeInstanceOf(ObjectId);
    expect(result.toString()).toStrictEqual(value.toString());
  });
});
