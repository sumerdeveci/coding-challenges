/**
 * convert file to a base64 url
 */
export const readUrlOfFile = (file: any): Promise<string> => {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = (e: any) => res(e.target.result);
    reader.onerror = (e) => rej(e);
    reader.readAsDataURL(file);
  });
};