const { isStringEmpty } = require('../string');

describe('isStringEmpty', () => {
  test('returns true for ""', () => {
    expect(isStringEmpty('')).toBeTruthy();
  });

  test('returns true for " "', () => {
    expect(isStringEmpty(' ')).toBeTruthy();
  });

  test('returns false for "a"', () => {
    expect(isStringEmpty('a')).not.toBeTruthy();
  });
});
