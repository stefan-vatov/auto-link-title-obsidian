/* eslint-disable */
export const asyncWrap = (promise: Promise<any>) =>
  promise.then(res => ({ res, error: null })).catch(error => ({ res: null, error }));
/* eslint-enable */

export const isUrl = (text: string, testRegex: string): boolean => {
  let urlRegex;

  if (!testRegex) {
    return false;
  }

  try {
    urlRegex = new RegExp(testRegex);
  } catch (e) {
    console.error(e);
    return false;
  }

  return urlRegex.test(text);
};
