## [v4.0.0](https://github.com/davidpelayo/orb-pivot/compare/v3.0.0...v4.0.0)
> Mar 18, 2026

### Breaking Changes
- Node.js >= 18 required (recommended: 24 LTS)
- React 18 peer dependency required

### Fixed
- Fixed all security vulnerabilities (0 npm audit issues)
- Fixed `React.createClass` removal — migrated to `create-react-class` package
- Fixed `React.createFactory` deprecation — replaced with `React.createElement`
- Fixed `orb.dimension.js` arrow function used as constructor (broke `new Dimension()`)
- Fixed Jest test infrastructure (Jasmine matchers → Jest `expect.extend`)
- Fixed test matching to exclude helper/data files

### Updated
- Updated all dependencies to latest versions (Babel 7.29, Rollup 4.59, Jest 30, Vite 8, etc.)
- Updated Node.js from 22 to 24 LTS
- Replaced Travis CI with GitHub Actions (Node 18/20/22/24 matrix)
- Removed legacy `gulpfile.js` and `.travis.yml`

### Added
- Comprehensive unit tests: 146 tests across 7 suites (utils, aggregation, filtering, state, config, pgrid, query)
- GitHub Actions CI workflow
- Interactive demo page (`index.html`) with Vite dev server
- `CLAUDE.md` project configuration
- Updated README with modern usage examples, install instructions, and API docs
- Updated CONTRIBUTING.md with current tooling

## [v3.0.0](https://github.com/davidpelayo/orb-pivot/compare/v2.0.4...v3.0.0)
> Dec 2024

- Complete ES6+ modernization of all source files
- Modernized to React 18, Vite/Rollup build system
- Replaced Jasmine with Jest for testing
- Added ESLint 9 flat config, Prettier, Husky, lint-staged
- Multiple build outputs: UMD, ESM, CSS with sourcemaps

## [v2.0.4](https://github.com/davidpelayo/orb-pivot/compare/v2.0.3...v2.0.4)
> Jun 08, 2017

- Added `CHANGES.md`.
- Added `CONTRIBUTING.md`.
- Added `ISSUE_TEMPLATE.md`.

## [v2.0.3](https://github.com/davidpelayo/orb-pivot/compare/1c4438fd428f6b0cf2b421cfd5ed0cce436ab580...v2.0.3)
> Jun 07, 2017

- Upgraded dependencies.
- Deleted unneeded files.
- Added `yarn.lock`.
- Added travis integration.
