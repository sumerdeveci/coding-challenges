import { isNullOrUndefined, isEmptyString } from '../index';

describe('isNullOrUndefined', () => {
  test('returns true for null', () => {
    expect(isNullOrUndefined(null)).toBeTruthy();
  });
  test('returns true for undefined', () => {
    expect(isNullOrUndefined(undefined)).toBeTruthy();
  });
  test('returns false for 0', () => {
    expect(isNullOrUndefined(0)).toBeFalsy();
  });
});

describe('isEmptyString', () => {
  test('returns true for \'\'', () => {
    expect(isEmptyString('')).toBeTruthy();
  });
  test('returns false for \'a\'', () => {
    expect(isEmptyString('a')).toBeFalsy();
  });
});
