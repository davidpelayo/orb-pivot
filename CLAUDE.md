# orb

Pivot table JavaScript library with React 18 rendering, drag-and-drop, filtering, drill-down, and Excel export.

## Quick Reference

```bash
npm install          # Install dependencies
npm test             # Run Jest tests (146 tests across 7 suites)
npm run build        # Rollup build → dist/ (UMD, ESM, CSS)
npm run dev          # Vite dev server on port 3000 (open index.html)
npm run lint         # ESLint (flat config, ESLint 9)
npm run format       # Prettier
```

## Architecture

- **Entry point**: `src/js/orb.js` — exports `utils`, `pgrid`, `pgridwidget`, `query`, `export`
- **Core engine**: `orb.pgrid.js` → `orb.axe.js` → `orb.dimension.js` (data model)
- **Config**: `orb.config.js` — field definitions, axes, grand/sub totals
- **Query API**: `orb.query.js` — fluent query interface for aggregation
- **Aggregation**: `orb.aggregation.js` — sum, avg, min, max, count, stdev, var, etc.
- **Filtering**: `orb.filtering.js` — expression-based filters with operators
- **React UI**: `src/js/react/orb.react.compiled.js` — all React components (uses `create-react-class`)
- **Styles**: `src/css/orb.less` — LESS stylesheets with theme system

## Build Outputs

- `dist/orb.js` — UMD (development)
- `dist/orb.min.js` — UMD (production, minified)
- `dist/orb.esm.js` — ES Module
- `dist/orb.css` / `dist/orb.min.css` — Compiled LESS styles

## Testing

Tests are in `test/spec/`. Jest config in `jest.config.json`. Test helper (`orbHelpers.js`) adds custom `toBeNumeric` matcher via `expect.extend`.

## Key Conventions

- CommonJS (`require`/`module.exports`) throughout source files
- React components use `create-react-class` (legacy pattern, compatible with React 18)
- Rollup config is ESM (`rollup.config.js`) — uses `import` syntax
- Node >= 18, recommended Node 24 LTS (see `.nvmrc`)
- Peer dependencies: `react@^18` and `react-dom@^18`
