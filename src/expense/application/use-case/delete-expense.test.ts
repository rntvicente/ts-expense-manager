import { ObjectId } from 'mongodb';

import { UniqueEntityIdVO } from '../../../shared/value-object/unique-entity-id-vo';

import { ExpensesRepository } from '../repository/expenses-repository';
import { DeleteExpense } from './delete-expense';

const makeRepository = () => {
  class ExpensesRepositoryStub implements ExpensesRepository {
    async findAndDelete(id: ObjectId): Promise<void> {
      expect(id).toBeInstanceOf(ObjectId);
    }
  }

  return new ExpensesRepositoryStub();
};

const makeSUT = () => {
  const repository = makeRepository();
  const sut = new DeleteExpense(repository);
  return { repository, sut };
};

describe('# Delete Expense Test Integration', () => {
  const uniqueEntityId = new UniqueEntityIdVO();

  it('should delete expense when id informed', async () => {
    const { sut } = makeSUT();
    await sut.execute(uniqueEntityId.toString());
  });

  it('should throw error when invalid id', async () => {
    const { sut } = makeSUT();

    await expect(() => sut.execute('invalid_id')).rejects.toThrow(
      'Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer'
    );
  });

  it('should throw error when database fail', async () => {
    const { repository, sut } = makeSUT();
    repository.findAndDelete = jest.fn().mockRejectedValueOnce(new Error('Network fail'));

    await expect(() => sut.execute(uniqueEntityId.toString())).rejects.toThrow('Network fail');
  })
});
