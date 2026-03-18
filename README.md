# orb-latest

[<img align="right" src="https://nodei.co/npm/orb-latest.png?compact=true"/>](https://www.npmjs.com/package/orb-latest)

Pivot grid JavaScript library with React 18 rendering.

**Latest version:** 4.0.0

[![CI](https://github.com/davidpelayo/orb-latest/actions/workflows/ci.yml/badge.svg)](https://github.com/davidpelayo/orb-latest/actions/workflows/ci.yml)

## Install

```bash
npm install orb-latest react react-dom
```

## Quick Start

### Browser (UMD)

```html
<link rel="stylesheet" href="node_modules/orb-latest/dist/orb.css" />
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="node_modules/orb-latest/dist/orb.min.js"></script>

<div id="pivot-container"></div>

<script>
  var widget = new orb.pgridwidget({
    dataSource: [
      ['US', 'Laptops', 120, 89999.99],
      ['US', 'Phones', 200, 159800.00],
      ['UK', 'Laptops', 90, 67499.99],
      ['UK', 'Phones', 180, 143820.00],
    ],
    fields: [
      { name: '0', caption: 'Country' },
      { name: '1', caption: 'Product' },
      { name: '2', caption: 'Quantity' },
      { name: '3', caption: 'Revenue', dataSettings: { aggregateFunc: 'sum' } }
    ],
    rows: ['Country'],
    columns: ['Product'],
    data: ['Quantity', 'Revenue']
  });
  widget.render(document.getElementById('pivot-container'));
</script>
```

### ES Module / Bundler

```javascript
import orb from 'orb-latest';
import 'orb-latest/dist/orb.css';

const pgrid = new orb.pgrid(config);
const query = pgrid.query();

// Query aggregation results
const result = query.Country('US').val('Revenue');
console.log(result.Revenue); // => 249799.99
```

## Features

### Interactivity
- Drag and drop to move fields between axes
- Click to sort columns and rows
- Visual filters with expression operators
- Drill down (cell double-click)
- Multiple data fields support
- Grand totals and sub totals
- Sub totals expand/collapse
- Enhanced scrolling (fixed headers)
- Export to Excel
- Fast rendering using [React 18](https://react.dev/)

### Customization
- Configure via code and/or toolbar
- Data headers location (rows or columns)
- Grand totals visibility per axis
- Sub totals visibility and collapsed state
- Custom aggregate and format functions
- Theming: built-in themes (red, blue, green, orange, flower, gray, black, white) and Bootstrap

### Data Query API

Query aggregation results with a fluent API:

```javascript
const orb = require('orb-latest');
const pgrid = new orb.pgrid(config);

// Query with field filters
const q = pgrid.query()
  .Manufacturer('Adventure Works')
  .Class('Economy');
```

**Single field**
```javascript
q.Amount()
// => 1185.17
```

**Multiple fields**
```javascript
q.val('Amount', 'Q')
// => { Amount: 1185.17, Q: 44 }
```

**Built-in aggregation**
```javascript
q.stdev('Amount', 'Q');
// => { Amount: 1377.58, Q: 3.9 }
```

**Custom aggregation**
```javascript
q.val({
  aggregateFunc: function(datafield, intersection, datasource) {
    return intersection.length;
  },
  fields: ['Amount', 'Q']
});
// => { Amount: 7, Q: 7 }
```

### Array Query (no pivot grid needed)

```javascript
const result = orb.query(dataArray, {
  '2': { caption: 'Manufacturer' },
  '3': { caption: 'Class' },
  '6': { toAggregate: true, caption: 'Amount', aggregateFunc: 'avg' }
})
  .Manufacturer('Adventure Works')
  .Amount();
// => 1185.17
```

## Built-in Aggregation Functions

| Function | Description |
|----------|-------------|
| `sum` | Sum (default) |
| `avg` | Average |
| `count` | Count |
| `min` | Minimum |
| `max` | Maximum |
| `prod` | Product |
| `stdev` | Sample standard deviation |
| `stdevp` | Population standard deviation |
| `var` | Sample variance |
| `varp` | Population variance |

## Development

```bash
nvm use              # Use Node 24 LTS (see .nvmrc)
npm install          # Install dependencies
npm run dev          # Start dev server (Vite, port 3000)
npm run build        # Build dist/ (Rollup)
npm test             # Run tests (Jest, 146 tests)
npm run test:coverage # Run tests with coverage
npm run lint         # Lint (ESLint 9, flat config)
npm run format       # Format (Prettier)
```

### Requirements

- Node.js >= 18 (recommended: 24 LTS)
- React 18 and React DOM 18 (peer dependencies)

## Compatibility

| Node.js | Status |
|---------|--------|
| 18 | Supported |
| 20 | Supported |
| 22 | Supported |
| 24 LTS | Recommended |

## License

[MIT](https://github.com/davidpelayo/orb-latest/blob/master/LICENSE)

## Credits

Originally forked from [nnajm/orb](https://github.com/nnajm/orb). Modernized and maintained by [David Pelayo](https://github.com/davidpelayo).
