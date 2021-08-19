export const isNullOrUndefined = (data: any): boolean => data === null || data === undefined;

/**
 * Does not do trim
 */
export const isEmptyString = (data: string) => data === '';