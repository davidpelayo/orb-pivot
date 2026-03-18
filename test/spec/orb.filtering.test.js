var filtering = require('../../src/js/orb.filtering');

describe('orb.filtering', function () {
  describe('constants', function () {
    it('defines ALL, NONE, BLANK constants', function () {
      expect(filtering.ALL).toBe('#All#');
      expect(filtering.NONE).toBe('#None#');
      expect(filtering.BLANK).toBeDefined();
    });
  });

  describe('Operators', function () {
    it('resolves operator by name', function () {
      expect(filtering.Operators.get('=')).toBe(filtering.Operators.EQ);
      expect(filtering.Operators.get('<>')).toBe(filtering.Operators.NEQ);
      expect(filtering.Operators.get('>')).toBe(filtering.Operators.GT);
      expect(filtering.Operators.get('>=')).toBe(filtering.Operators.GTE);
      expect(filtering.Operators.get('<')).toBe(filtering.Operators.LT);
      expect(filtering.Operators.get('<=')).toBe(filtering.Operators.LTE);
      expect(filtering.Operators.get('Matches')).toBe(filtering.Operators.MATCH);
      expect(filtering.Operators.get('Does Not Match')).toBe(filtering.Operators.NOTMATCH);
    });

    it('returns NONE for unknown operator', function () {
      expect(filtering.Operators.get('unknown')).toBeNull();
    });

    describe('EQ', function () {
      it('tests equality', function () {
        expect(filtering.Operators.EQ.func(5, 5)).toBe(true);
        expect(filtering.Operators.EQ.func(5, 6)).toBe(false);
      });
    });

    describe('NEQ', function () {
      it('tests inequality', function () {
        expect(filtering.Operators.NEQ.func(5, 6)).toBe(true);
        expect(filtering.Operators.NEQ.func(5, 5)).toBe(false);
      });
    });

    describe('GT', function () {
      it('tests greater than', function () {
        expect(filtering.Operators.GT.func(10, 5)).toBe(true);
        expect(filtering.Operators.GT.func(5, 10)).toBe(false);
      });
    });

    describe('GTE', function () {
      it('tests greater than or equal', function () {
        expect(filtering.Operators.GTE.func(10, 10)).toBe(true);
        expect(filtering.Operators.GTE.func(10, 5)).toBe(true);
        expect(filtering.Operators.GTE.func(5, 10)).toBe(false);
      });
    });

    describe('LT', function () {
      it('tests less than', function () {
        expect(filtering.Operators.LT.func(5, 10)).toBe(true);
        expect(filtering.Operators.LT.func(10, 5)).toBe(false);
      });
    });

    describe('LTE', function () {
      it('tests less than or equal', function () {
        expect(filtering.Operators.LTE.func(5, 5)).toBe(true);
        expect(filtering.Operators.LTE.func(5, 10)).toBe(true);
        expect(filtering.Operators.LTE.func(10, 5)).toBe(false);
      });
    });

    describe('MATCH', function () {
      it('matches string pattern', function () {
        expect(filtering.Operators.MATCH.func('Hello World', 'hello')).toBe(true);
        expect(filtering.Operators.MATCH.func('Hello World', 'xyz')).toBe(false);
      });

      it('matches with regex', function () {
        expect(filtering.Operators.MATCH.func('Hello World', /world/i)).toBe(true);
      });
    });

    describe('NOTMATCH', function () {
      it('returns true when pattern does not match', function () {
        expect(filtering.Operators.NOTMATCH.func('Hello World', 'xyz')).toBe(true);
        expect(filtering.Operators.NOTMATCH.func('Hello World', 'hello')).toBe(false);
      });
    });
  });

  describe('expressionFilter', function () {
    it('filters by static array (include mode)', function () {
      var filter = new filtering.expressionFilter(null, null, ['a', 'b'], false);
      expect(filter.test('a')).toBe(true);
      expect(filter.test('b')).toBe(true);
      expect(filter.test('c')).toBe(false);
    });

    it('filters by static array (exclude mode)', function () {
      var filter = new filtering.expressionFilter(null, null, ['a', 'b'], true);
      expect(filter.test('a')).toBe(false);
      expect(filter.test('c')).toBe(true);
    });

    it('filters by operator and term', function () {
      var filter = new filtering.expressionFilter('>', 10);
      expect(filter.test(15)).toBe(true);
      expect(filter.test(5)).toBe(false);
    });

    it('returns true for ALL static value', function () {
      var filter = new filtering.expressionFilter(null, null, filtering.ALL);
      expect(filter.test('anything')).toBe(true);
    });

    it('returns false for NONE static value', function () {
      var filter = new filtering.expressionFilter(null, null, filtering.NONE);
      expect(filter.test('anything')).toBe(false);
    });

    it('returns true for boolean true static value', function () {
      var filter = new filtering.expressionFilter(null, null, true);
      expect(filter.test('anything')).toBe(true);
    });

    it('returns false for boolean false static value', function () {
      var filter = new filtering.expressionFilter(null, null, false);
      expect(filter.test('anything')).toBe(false);
    });

    describe('isAlwaysTrue()', function () {
      it('returns true when no term or restrictive static value', function () {
        var filter = new filtering.expressionFilter(null, null, true);
        expect(filter.isAlwaysTrue()).toBe(true);
      });

      it('returns false when term is set', function () {
        var filter = new filtering.expressionFilter('>', 10);
        expect(filter.isAlwaysTrue()).toBe(false);
      });

      it('returns false when static array is set', function () {
        var filter = new filtering.expressionFilter(null, null, ['a'], false);
        expect(filter.isAlwaysTrue()).toBe(false);
      });
    });
  });
});
