var config = require('../../src/js/orb.config');

describe('orb.config', function () {
  var testConfig;

  beforeEach(function () {
    testConfig = new config.config({
      dataSource: [
        ['Store A', 'Widget', 'Acme', 'Economy', 'Gadgets', 10, 100],
        ['Store B', 'Gizmo', 'Beta Corp', 'Premium', 'Gadgets', 5, 200],
        ['Store A', 'Widget', 'Acme', 'Economy', 'Gadgets', 8, 80],
      ],
      fields: [
        { name: '0', caption: 'Store' },
        { name: '1', caption: 'Product' },
        { name: '2', caption: 'Manufacturer' },
        { name: '3', caption: 'Class' },
        { name: '4', caption: 'Category' },
        { name: '5', caption: 'Quantity' },
        { name: '6', caption: 'Amount', dataSettings: { aggregateFunc: 'sum' } },
      ],
      rows: ['Manufacturer'],
      columns: ['Class'],
      data: ['Amount'],
    });
  });

  describe('initialization', function () {
    it('sets dataSource', function () {
      expect(testConfig.dataSource.length).toBe(3);
    });

    it('sets all fields', function () {
      expect(testConfig.allFields.length).toBe(7);
    });

    it('maps field names to captions', function () {
      expect(testConfig.captionToName('Store')).toBe('0');
      expect(testConfig.nameToCaption('0')).toBe('Store');
    });

    it('sets row fields from config', function () {
      expect(testConfig.rowFields.length).toBe(1);
      expect(testConfig.rowFields[0].name).toBe('2');
    });

    it('sets column fields from config', function () {
      expect(testConfig.columnFields.length).toBe(1);
      expect(testConfig.columnFields[0].name).toBe('3');
    });

    it('sets data fields from config', function () {
      expect(testConfig.dataFields.length).toBe(1);
      expect(testConfig.dataFields[0].name).toBe('6');
    });

    it('defaults dataHeadersLocation to rows', function () {
      var cfg = new config.config({ dataSource: [] });
      expect(cfg.dataHeadersLocation).toBe('rows');
    });

    it('allows columns as dataHeadersLocation', function () {
      var cfg = new config.config({ dataSource: [], dataHeadersLocation: 'columns' });
      expect(cfg.dataHeadersLocation).toBe('columns');
    });
  });

  describe('grandTotal', function () {
    it('defaults to visible for rows and columns', function () {
      expect(testConfig.grandTotal.rowsvisible).toBe(true);
      expect(testConfig.grandTotal.columnsvisible).toBe(true);
    });

    it('toggles grandtotal visibility', function () {
      expect(testConfig.toggleGrandtotal(1)).toBe(true); // COLUMNS
      expect(testConfig.isGrandtotalVisible(1)).toBe(false);
      testConfig.toggleGrandtotal(1);
      expect(testConfig.isGrandtotalVisible(1)).toBe(true);
    });
  });

  describe('subtotals', function () {
    it('defaults to visible', function () {
      expect(testConfig.areSubtotalsVisible(2)).toBe(true); // ROWS
      expect(testConfig.areSubtotalsVisible(1)).toBe(true); // COLUMNS
    });

    it('toggles subtotals visibility', function () {
      expect(testConfig.toggleSubtotals(2)).toBe(true);
      expect(testConfig.areSubtotalsVisible(2)).toBe(false);
    });

    it('returns false for invalid axetype', function () {
      expect(testConfig.toggleSubtotals(99)).toBe(false);
    });
  });

  describe('getField()', function () {
    it('finds field by name', function () {
      var field = testConfig.getField('0');
      expect(field).not.toBeNull();
      expect(field.caption).toBe('Store');
    });

    it('returns null for unknown field', function () {
      expect(testConfig.getField('nonexistent')).toBeNull();
    });
  });

  describe('availablefields()', function () {
    it('returns fields not in any axis', function () {
      var available = testConfig.availablefields();
      var names = available.map(function (f) {
        return f.name;
      });
      // Fields 0,1,4,5 are not in rows, columns, or data
      expect(names).toContain('0');
      expect(names).toContain('1');
      expect(names).toContain('4');
      expect(names).toContain('5');
      expect(names).not.toContain('2'); // in rows
      expect(names).not.toContain('3'); // in columns
      expect(names).not.toContain('6'); // in data
    });
  });

  describe('moveField()', function () {
    it('moves a field from rows to columns', function () {
      var result = testConfig.moveField('2', 2, 1); // ROWS to COLUMNS
      expect(result).toBe(true);
      expect(testConfig.rowFields.length).toBe(0);
      expect(testConfig.columnFields.length).toBe(2);
    });
  });
});

describe('orb.config.field', function () {
  it('creates a field with name and caption', function () {
    var f = new config.field({ name: 'test', caption: 'Test Field' });
    expect(f.name).toBe('test');
    expect(f.caption).toBe('Test Field');
  });

  it('defaults caption to name', function () {
    var f = new config.field({ name: 'test' });
    expect(f.caption).toBe('test');
  });

  it('has sort configuration', function () {
    var f = new config.field({ name: 'test', sort: { order: 'asc' } });
    expect(f.sort.order).toBe('asc');
  });

  it('has subTotal configuration', function () {
    var f = new config.field({ name: 'test', subTotal: { visible: false } });
    expect(f.subTotal.visible).toBe(false);
  });

  it('has aggregate function', function () {
    var f = new config.field({ name: 'test', aggregateFunc: 'avg' });
    expect(typeof f.aggregateFunc()).toBe('function');
  });
});
