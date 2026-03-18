var utils = require('../../src/js/orb.utils');

describe('orb.utils', function () {
  describe('ns()', function () {
    it('creates nested namespace on a parent object', function () {
      var parent = {};
      var result = utils.ns('a.b.c', parent);
      expect(parent.a).toBeDefined();
      expect(parent.a.b).toBeDefined();
      expect(parent.a.b.c).toBeDefined();
      expect(result).toBe(parent.a.b.c);
    });

    it('does not overwrite existing namespace parts', function () {
      var parent = { a: { existing: true } };
      utils.ns('a.b', parent);
      expect(parent.a.existing).toBe(true);
      expect(parent.a.b).toBeDefined();
    });
  });

  describe('ownProperties()', function () {
    it('returns own property names', function () {
      var obj = { a: 1, b: 2, c: 3 };
      var result = utils.ownProperties(obj);
      expect(result).toEqual(['a', 'b', 'c']);
    });

    it('excludes inherited properties', function () {
      var parent = { inherited: true };
      var obj = Object.create(parent);
      obj.own = true;
      expect(utils.ownProperties(obj)).toEqual(['own']);
    });
  });

  describe('isArray()', function () {
    it('returns true for arrays', function () {
      expect(utils.isArray([])).toBe(true);
      expect(utils.isArray([1, 2, 3])).toBe(true);
    });

    it('returns false for non-arrays', function () {
      expect(utils.isArray({})).toBe(false);
      expect(utils.isArray('string')).toBe(false);
      expect(utils.isArray(null)).toBe(false);
      expect(utils.isArray(undefined)).toBe(false);
    });
  });

  describe('isNumber()', function () {
    it('returns true for numbers', function () {
      expect(utils.isNumber(42)).toBe(true);
      expect(utils.isNumber(0)).toBe(true);
      expect(utils.isNumber(-1.5)).toBe(true);
      expect(utils.isNumber(NaN)).toBe(true);
    });

    it('returns false for non-numbers', function () {
      expect(utils.isNumber('42')).toBe(false);
      expect(utils.isNumber(null)).toBe(false);
      expect(utils.isNumber(undefined)).toBe(false);
    });
  });

  describe('isDate()', function () {
    it('returns true for Date objects', function () {
      expect(utils.isDate(new Date())).toBe(true);
    });

    it('returns false for non-dates', function () {
      expect(utils.isDate('2024-01-01')).toBe(false);
      expect(utils.isDate(1234567890)).toBe(false);
    });
  });

  describe('isString()', function () {
    it('returns true for strings', function () {
      expect(utils.isString('hello')).toBe(true);
      expect(utils.isString('')).toBe(true);
    });

    it('returns false for non-strings', function () {
      expect(utils.isString(42)).toBe(false);
      expect(utils.isString(null)).toBe(false);
    });
  });

  describe('isRegExp()', function () {
    it('returns true for RegExp objects', function () {
      expect(utils.isRegExp(/test/)).toBe(true);
      expect(utils.isRegExp(new RegExp('test'))).toBe(true);
    });

    it('returns false for non-RegExp', function () {
      expect(utils.isRegExp('/test/')).toBe(false);
    });
  });

  describe('escapeRegex()', function () {
    it('escapes special regex characters', function () {
      expect(utils.escapeRegex('a.b*c')).toBe('a\\.b\\*c');
      expect(utils.escapeRegex('foo[bar]')).toBe('foo\\[bar\\]');
      expect(utils.escapeRegex('(a|b)')).toBe('\\(a\\|b\\)');
    });
  });

  describe('findInArray()', function () {
    it('finds first matching element', function () {
      var arr = [1, 2, 3, 4, 5];
      var result = utils.findInArray(arr, function (x) {
        return x > 3;
      });
      expect(result).toBe(4);
    });

    it('returns undefined when no match', function () {
      var arr = [1, 2, 3];
      var result = utils.findInArray(arr, function (x) {
        return x > 10;
      });
      expect(result).toBeUndefined();
    });

    it('returns undefined for non-arrays', function () {
      expect(
        utils.findInArray(null, function () {
          return true;
        })
      ).toBeUndefined();
    });
  });

  describe('jsonStringify()', function () {
    it('serializes an object to JSON', function () {
      var result = utils.jsonStringify({ a: 1, b: 2 });
      expect(JSON.parse(result)).toEqual({ a: 1, b: 2 });
    });

    it('censors specified keywords', function () {
      var result = utils.jsonStringify({ a: 1, secret: 'hidden' }, ['secret']);
      var parsed = JSON.parse(result);
      expect(parsed.a).toBe(1);
      expect(parsed.secret).toBeUndefined();
    });
  });

  describe('btoa() / atob()', function () {
    it('encodes and decodes base64', function () {
      var original = 'Hello, World!';
      var encoded = utils.btoa(original);
      expect(typeof encoded).toBe('string');
      expect(utils.atob(encoded)).toBe(original);
    });
  });
});
