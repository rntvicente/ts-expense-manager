import Chance from 'chance';
import { User } from '../users/user-entity';

import { GeneratorToken } from './generator-token';

describe('# Generator Token Unit Test', () => {
  const chance = Chance();

  let generateToken: GeneratorToken;
  let user: User;

  beforeAll(async () => {
    generateToken = new GeneratorToken('secret_test');
    user = await User.create(
      chance.first(),
      chance.last(),
      chance.email(),
      'P4ssw@rd'
    );
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should generate token valid with espires in 30 min', () => {
    const now = Date.now();
    const expiresIn = Math.floor(now / 1000) + 10 * 60;

    const token = generateToken.generate(user, expiresIn, new Date(now));
    const decoded = generateToken.verify(token);

    expect(decoded).toBeTruthy();
  });
});
