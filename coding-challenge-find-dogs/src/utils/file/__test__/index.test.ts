import { readUrlOfFile } from "..";

describe('readUrlOfFile', () => {
  test('Can read a file without throwing error or returning falsy values such as unddefined or null', () => {
    const file = new File(['(⌐□_□)'], 'face.png', { type: 'image/png' });
    const dataUrl = readUrlOfFile(file)
    expect(dataUrl).not.toBeFalsy();
  });
});