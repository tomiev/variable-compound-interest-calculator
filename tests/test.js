// Testing done with QUnit: https://qunitjs.com/
// To run tests, visit /tests/test.html in the browser

import { calculateYear, getAllYearData } from '../compound.js';

// Calculate year tests
QUnit.module('calculateYear', function () {
  QUnit.test('no contributions & annual compounding', function (assert) {
    const result = calculateYear(100, 0, 12, 10, 1, 0, 0);
    assert.equal(result.contributions.toFixed(2), '100.00');
    assert.equal(result.interest.toFixed(2), '10.00');
    assert.equal(result.balance.toFixed(2), '110.00');
  });

  QUnit.test('no contributions & monthly compounding', function (assert) {
    const result = calculateYear(100, 0, 12, 10, 12, 0, 0);
    assert.equal(result.contributions.toFixed(2), '100.00');
    assert.equal(result.interest.toFixed(2), '10.47');
    assert.equal(result.balance.toFixed(2), '110.47');
  });

  QUnit.test('monthly contributions & monthly compounding', function (assert) {
    const result = calculateYear(100, 10, 12, 10, 12, 0, 0);
    assert.equal(result.contributions.toFixed(2), '220.00');
    assert.equal(result.interest.toFixed(2), '16.13');
    assert.equal(result.balance.toFixed(2), '236.13');
  });

  QUnit.test('weekly contributions & annual compounding', function (assert) {
    const result = calculateYear(100, 10, 52, 10, 1, 0, 0);
    assert.equal(result.contributions.toFixed(2), '620.00');
    assert.equal(result.interest.toFixed(2), '35.09');
    assert.equal(result.balance.toFixed(2), '655.09');
  });
});

QUnit.module('getAllYearData', function () {
  QUnit.test('three year strategy', function (assert) {
    const principal = 100;
    const stages = [
      {
        regularPayment: 10,
        paymentsPerYear: 12,
        rate: 10,
        compoundsPerYear: 12,
        years: 1
      },
      {
        regularPayment: 20,
        paymentsPerYear: 12,
        rate: 10,
        compoundsPerYear: 12,
        years: 2
      }
    ];

    const years = getAllYearData(principal, stages);
    assert.equal(years.length, 3);

    const year1 = years[0];
    assert.equal(year1.interest.toFixed(2), '16.13');
    assert.equal(year1.contributions.toFixed(2), '220.00');
    assert.equal(year1.balance.toFixed(2), '236.13');
    assert.equal(year1.cumulativeInterest.toFixed(2), '16.13');
    assert.equal(year1.cumulativeContributions.toFixed(2), '220.00');

    const year2 = years[1];
    assert.equal(year2.interest.toFixed(2), '36.04');
    assert.equal(year2.contributions.toFixed(2), '240.00');
    assert.equal(year2.balance.toFixed(2), '512.16');
    assert.equal(year2.cumulativeInterest.toFixed(2), '52.16');
    assert.equal(year2.cumulativeContributions.toFixed(2), '460.00');

    const year3 = years[2];
    assert.equal(year3.interest.toFixed(2), '64.94');
    assert.equal(year3.contributions.toFixed(2), '240.00');
    assert.equal(year3.balance.toFixed(2), '817.11');
    assert.equal(year3.cumulativeInterest.toFixed(2), '117.11');
    assert.equal(year3.cumulativeContributions.toFixed(2), '700.00');
  });
});
