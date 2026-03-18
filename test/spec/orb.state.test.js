var State = require('../../src/js/orb.state');

describe('orb.state', function () {
  it('stores and retrieves state by key', function () {
    var state = new State();
    state.set('key1', 'value1');
    expect(state.get('key1')).toBe('value1');
  });

  it('returns undefined for unset keys', function () {
    var state = new State();
    expect(state.get('nonexistent')).toBeUndefined();
  });

  it('overwrites existing state', function () {
    var state = new State();
    state.set('key', 'first');
    state.set('key', 'second');
    expect(state.get('key')).toBe('second');
  });

  it('supports multiple independent keys', function () {
    var state = new State();
    state.set('a', 1);
    state.set('b', 2);
    expect(state.get('a')).toBe(1);
    expect(state.get('b')).toBe(2);
  });

  it('supports complex values', function () {
    var state = new State();
    var complexValue = { nested: { deep: true }, arr: [1, 2, 3] };
    state.set('complex', complexValue);
    expect(state.get('complex')).toBe(complexValue);
  });
});
