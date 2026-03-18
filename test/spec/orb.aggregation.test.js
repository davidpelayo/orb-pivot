var aggregation = require('../../src/js/orb.aggregation');

describe('orb.aggregation', function () {
  // Sample data: array of arrays where index 0 = value
  var data = [
    [10],
    [20],
    [30],
    [40],
    [50],
  ];
  var allIndexes = [0, 1, 2, 3, 4];

  describe('count()', function () {
    it('counts all elements when intersection is "all"', function () {
      expect(aggregation.count(0, 'all', data)).toBe(5);
    });

    it('counts intersection elements', function () {
      expect(aggregation.count(0, [0, 1, 2], data)).toBe(3);
    });
  });

  describe('sum()', function () {
    it('sums all values', function () {
      expect(aggregation.sum(0, allIndexes, data)).toBe(150);
    });

    it('sums subset of values', function () {
      expect(aggregation.sum(0, [0, 1], data)).toBe(30);
    });
  });

  describe('min()', function () {
    it('finds minimum value', function () {
      expect(aggregation.min(0, allIndexes, data)).toBe(10);
    });
  });

  describe('max()', function () {
    it('finds maximum value', function () {
      expect(aggregation.max(0, allIndexes, data)).toBe(50);
    });
  });

  describe('avg()', function () {
    it('calculates average', function () {
      expect(aggregation.avg(0, allIndexes, data)).toBe(30);
    });

    it('returns 0 for empty intersection', function () {
      expect(aggregation.avg(0, [], data)).toBe(0);
    });
  });

  describe('prod()', function () {
    it('calculates product', function () {
      var smallData = [[2], [3], [4]];
      expect(aggregation.prod(0, [0, 1, 2], smallData)).toBe(24);
    });
  });

  describe('stdev()', function () {
    it('calculates sample standard deviation', function () {
      var result = aggregation.stdev(0, allIndexes, data);
      // stdev of [10,20,30,40,50] = sqrt(250) ≈ 15.81
      expect(result).toBeCloseTo(15.81, 1);
    });

    it('returns NaN for single element (sample stdev)', function () {
      expect(aggregation.stdev(0, [0], data)).toBeNaN();
    });
  });

  describe('stdevp()', function () {
    it('calculates population standard deviation', function () {
      var result = aggregation.stdevp(0, allIndexes, data);
      // population stdev of [10,20,30,40,50] = sqrt(200) ≈ 14.14
      expect(result).toBeCloseTo(14.14, 1);
    });
  });

  describe('var()', function () {
    it('calculates sample variance', function () {
      var result = aggregation.var(0, allIndexes, data);
      expect(result).toBeCloseTo(250, 0);
    });
  });

  describe('varp()', function () {
    it('calculates population variance', function () {
      var result = aggregation.varp(0, allIndexes, data);
      expect(result).toBeCloseTo(200, 0);
    });
  });

  describe('toAggregateFunc()', function () {
    it('returns sum as default when no arg', function () {
      expect(aggregation.toAggregateFunc()).toBe(aggregation.sum);
    });

    it('returns sum as default for invalid arg', function () {
      expect(aggregation.toAggregateFunc('invalid')).toBe(aggregation.sum);
    });

    it('resolves string name to function', function () {
      expect(aggregation.toAggregateFunc('avg')).toBe(aggregation.avg);
      expect(aggregation.toAggregateFunc('min')).toBe(aggregation.min);
      expect(aggregation.toAggregateFunc('max')).toBe(aggregation.max);
      expect(aggregation.toAggregateFunc('count')).toBe(aggregation.count);
      expect(aggregation.toAggregateFunc('stdev')).toBe(aggregation.stdev);
    });

    it('returns custom function as-is', function () {
      var custom = function () {};
      expect(aggregation.toAggregateFunc(custom)).toBe(custom);
    });
  });
});
