/**
 * is the given string `null`, `undefined`, empty, or does it only consist of spaces.
 */
export const isStringEmpty = (text) => !text || !(text?.trim())