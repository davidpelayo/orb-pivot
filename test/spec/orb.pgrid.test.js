var orb = require('../../src/js/orb');

describe('orb.pgrid', function () {
  var pgridConfig = {
    dataSource: [
      ['Store A', 'Widget', 'Acme', 'Economy', 'Gadgets', 10, 100.5],
      ['Store B', 'Gizmo', 'Beta Corp', 'Premium', 'Gadgets', 5, 200.0],
      ['Store A', 'Widget', 'Acme', 'Economy', 'Gadgets', 8, 80.0],
      ['Store C', 'Doohickey', 'Acme', 'Premium', 'Tools', 3, 150.0],
      ['Store B', 'Thingamajig', 'Beta Corp', 'Economy', 'Tools', 7, 50.0],
    ],
    dataHeadersLocation: 'columns',
    grandTotal: { rowsvisible: true, columnsvisible: true },
    subTotal: { visible: true },
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
  };

  var pgrid;

  beforeEach(function () {
    pgrid = new orb.pgrid(pgridConfig);
  });

  it('creates a pgrid instance', function () {
    expect(pgrid).toBeDefined();
    expect(pgrid.config).toBeDefined();
  });

  it('has rows and columns axes', function () {
    expect(pgrid.rows).toBeDefined();
    expect(pgrid.columns).toBeDefined();
  });

  it('has filtered data source', function () {
    expect(pgrid.filteredDataSource).toBeDefined();
    expect(pgrid.filteredDataSource.length).toBe(5);
  });

  describe('query()', function () {
    it('returns a query object', function () {
      var q = pgrid.query();
      expect(q).toBeDefined();
      expect(typeof q.val).toBe('function');
      expect(typeof q.stdev).toBe('function');
    });

    it('queries grand total Amount', function () {
      var q = pgrid.query();
      var result = q.val('Amount');
      expect(result).not.toBeNull();
      expect(result.Amount).toBeCloseTo(580.5, 1);
    });

    it('queries sliced data', function () {
      var q = pgrid.query().Manufacturer('Acme');
      var result = q.val('Amount');
      expect(result.Amount).toBeCloseTo(330.5, 1);
    });

    it('queries with multiple slices', function () {
      var q = pgrid.query().Manufacturer('Acme').Class('Economy');
      var result = q.val('Amount');
      expect(result.Amount).toBeCloseTo(180.5, 1);
    });
  });

  describe('getData()', function () {
    it('returns aggregated data for a field', function () {
      var result = pgrid.getData('6', pgrid.rows.root, pgrid.columns.root);
      expect(typeof result).toBe('number');
      expect(result).toBeCloseTo(580.5, 1);
    });
  });

  describe('moveField()', function () {
    it('can move a field between axes', function () {
      var result = pgrid.moveField('2', 2, 1); // rows to columns
      expect(result).toBe(true);
    });
  });

  describe('applyFilter()', function () {
    it('filters data source', function () {
      pgrid.applyFilter('2', 'Matches', 'Acme');
      expect(pgrid.filteredDataSource.length).toBeLessThan(5);
    });
  });
});

describe('orb.pgrid custom sort', function () {
  it('applies custom sort function to row dimensions', function () {
    var customSortConfig = {
      dataSource: [
        ['Charlie', 'Economy', 10],
        ['Alice', 'Premium', 20],
        ['Bob', 'Economy', 30],
      ],
      fields: [
        {
          name: '0',
          caption: 'Name',
          sort: {
            order: 'asc',
            customfunc: function (a, b) {
              return a.length - b.length;
            },
          },
        },
        { name: '1', caption: 'Class' },
        { name: '2', caption: 'Amount', dataSettings: { aggregateFunc: 'sum' } },
      ],
      rows: ['Name'],
      columns: ['Class'],
      data: ['Amount'],
    };

    var pg = new orb.pgrid(customSortConfig);
    // Custom sort by string length: Bob(3), Alice(5), Charlie(7)
    var rowValues = pg.rows.root.values;
    expect(rowValues[0]).toBe('Bob');
    expect(rowValues[1]).toBe('Alice');
    expect(rowValues[2]).toBe('Charlie');
  });

  it('applies default sort (asc) when no custom function', function () {
    var sortConfig = {
      dataSource: [
        ['Charlie', 10],
        ['Alice', 20],
        ['Bob', 30],
      ],
      fields: [
        { name: '0', caption: 'Name', sort: { order: 'asc' } },
        { name: '1', caption: 'Amount', dataSettings: { aggregateFunc: 'sum' } },
      ],
      rows: ['Name'],
      columns: [],
      data: ['Amount'],
    };

    var pg = new orb.pgrid(sortConfig);
    var rowValues = pg.rows.root.values;
    expect(rowValues[0]).toBe('Alice');
    expect(rowValues[1]).toBe('Bob');
    expect(rowValues[2]).toBe('Charlie');
  });

  it('applies desc sort', function () {
    var sortConfig = {
      dataSource: [
        ['Alice', 10],
        ['Charlie', 20],
        ['Bob', 30],
      ],
      fields: [
        { name: '0', caption: 'Name', sort: { order: 'desc' } },
        { name: '1', caption: 'Amount', dataSettings: { aggregateFunc: 'sum' } },
      ],
      rows: ['Name'],
      columns: [],
      data: ['Amount'],
    };

    var pg = new orb.pgrid(sortConfig);
    var rowValues = pg.rows.root.values;
    expect(rowValues[0]).toBe('Charlie');
    expect(rowValues[1]).toBe('Bob');
    expect(rowValues[2]).toBe('Alice');
  });
});

describe('orb module exports', function () {
  it('exports utils', function () {
    expect(orb.utils).toBeDefined();
  });

  it('exports pgrid', function () {
    expect(orb.pgrid).toBeDefined();
  });

  it('exports query', function () {
    expect(orb.query).toBeDefined();
  });

  it('exports pgridwidget', function () {
    expect(orb.pgridwidget).toBeDefined();
  });
});
