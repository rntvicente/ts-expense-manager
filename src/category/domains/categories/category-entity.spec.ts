import Chance from 'chance';

import { UniqueEntityIdVO } from '../../../shared/value-object/unique-entity-id-vo';
import { Category } from './catogory-entity';

describe('# Category Test Unit', () => {
  const chance = Chance();

  it('should throw error when not informed description', () => {
    expect(() => Category.create('')).toThrow(
      new Error('Missing Param: Description')
    );
  });

  it('should create a Category', () => {
    const category = Category.create(chance.word({ length: 25 }));

    expect(category.description).toBeDefined()
    expect(category.id).toBeInstanceOf(UniqueEntityIdVO)
  });
});
