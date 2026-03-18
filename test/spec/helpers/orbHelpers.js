expect.extend({
  toBeNumeric(received) {
    const pass = received !== undefined && !isNaN(received) && typeof received === 'number';
    return {
      message: () => `expected ${received} ${pass ? 'not ' : ''}to be numeric`,
      pass,
    };
  },
});