import { describe, expect, it } from '@jest/globals';
import { isUrl } from '../../src/util';
import { DEFAULT_SETTINGS } from '../../src/constants';

describe('When calling the util methods', function () {
  describe('and the method is isUrl', function () {
    it('should return false if the testRegex is undefined', function () {
      const result = isUrl('http://obsidian.md', undefined);

      expect(result).toEqual(false);
    });

    it('should return false if the testRegex is null', function () {
      const result = isUrl('http://obsidian.md', null);

      expect(result).toEqual(false);
    });

    it('should return false if the testRegex is not valid regex', function () {
      const result = isUrl('http://obsidian.md', 'not regex');

      expect(result).toEqual(false);
    });

    it('should return false if the text is not valid url string', function () {
      const result = isUrl('not url', DEFAULT_SETTINGS.regex);

      expect(result).toEqual(false);
    });

    it('should allow for https urls by default', function () {
      const result = isUrl('https://obsidian.md', DEFAULT_SETTINGS.regex);

      expect(result).toEqual(true);
    });

    it('should allow for http urls by default', function () {
      const result = isUrl('http://obsidian.md', DEFAULT_SETTINGS.regex);

      expect(result).toEqual(true);
    });
  });
});
