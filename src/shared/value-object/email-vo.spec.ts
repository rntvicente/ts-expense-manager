/* eslint-disable @typescript-eslint/no-explicit-any */
import Chance from 'chance';

import { EmailVO } from './email-vo';

describe('# Class E-mail Test Unit', () => {
  const chance = Chance();

  it.each([
    '',
    ' ',
    null,
    undefined,
    jest.fn(),
    true,
    false,
    123,
    'abc',
    'abc@',
    'abc@email',
    'abc@email.'
  ])('should throw error when invalid "%s" email', (param) => {
    expect(() => new EmailVO(param as any)).toThrow();
  });

  it('should create valid email when instance class', () => {
    const validEmail = chance.email();
    const email = new EmailVO(validEmail);

    expect(email).toBeInstanceOf(EmailVO);
    expect(email.value).toStrictEqual(validEmail);
  });
});
