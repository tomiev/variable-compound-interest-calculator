// Testing done with QUnit: https://qunitjs.com/
// To run tests, start a local server and visit /tests/test.html in the browser

import { compound } from '../compound.js';

// Compound function tests
QUnit.module('compound', function() {
  QUnit.test('one year, no contributions', function(assert) {
    const result = compound(100, 0, 12, 10, 1, 1);
    assert.equal(result.balance.toFixed(2), "110.00");
  });

  QUnit.test('two years, no contributions', function(assert) {
    const result = compound(100, 0, 12, 10, 1, 2);
    assert.equal(result.balance.toFixed(2), "121.00");
  });

  QUnit.test('one year with monthly contributions & monthly compounding', function(assert) {
    const result = compound(100, 10, 12, 10, 12, 1);
    assert.equal(result.balance.toFixed(2), "236.13");
  });

  QUnit.test('ten years with monthly contributions & monthly compounding', function(assert) {
    const result = compound(100, 10, 12, 10, 12, 10);
    assert.equal(result.balance.toFixed(2), "2319.15");
  });

  QUnit.test('one year with weekly contributions & annual compounding', function(assert) {
    const result = compound(100, 10, 52, 10, 1, 1);
    assert.equal(result.balance.toFixed(2), "655.09");
  });

  QUnit.test('ten years with weekly contributions & annual compounding', function(assert) {
    const result = compound(100, 10, 52, 10, 1, 10);
    assert.equal(result.balance.toFixed(2), "8946.66");
  });

  QUnit.test('ten years with weekly contributions & monthly compounding', function(assert) {
    const result = compound(100, 10, 52, 10, 12, 10);
    assert.equal(result.balance.toFixed(2), "9175.72");
  });
});
