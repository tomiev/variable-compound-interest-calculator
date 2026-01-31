/**
 * Returns the total balance, contributions, and interest earned in one year.
 * @param {number} principal
 * @param {int} regularContribution
 * @param {int} contributionsPerYear
 * @param {int} rate - annual interest rate
 * @param {int} compoundsPerYear
 * @param {number} - value of all contributions prior to this year
 * @param {number} - value of all interest earned prior to this year
 */
export function calculateYear(
  principal,
  regularContribution,
  contributionsPerYear,
  rate,
  compoundsPerYear,
  previousInterest,
  previousContributions
) {
  const r = rate / 100;
  const grownPrincipal = principal * (1 + r / compoundsPerYear) ** compoundsPerYear;

  const payments = regularContribution * contributionsPerYear;
  const paymentGrowthFactor = (1 + r / compoundsPerYear) ** (compoundsPerYear / contributionsPerYear) - 1;
  const grownPayments =
    (regularContribution * ((1 + paymentGrowthFactor) ** contributionsPerYear - 1)) / paymentGrowthFactor;

  const balance = grownPrincipal + grownPayments;
  // If there are no previous contributions, we are in year 1 and the principal should be counted towards
  // this year's contributions. Otherwise omit the principal.
  const contributions = previousContributions === 0 ? principal + payments : payments;
  const interest = balance - contributions - previousContributions - previousInterest;

  return {
    balance: balance,
    contributions: contributions,
    interest: interest,
    cumulativeInterest: interest + previousInterest,
    cumulativeContributions: contributions + previousContributions
  };
}

/**
 * Returns results from all years of the investment strategy.
 * Output is an array of year data, e.g. [{balance, contributions, interest}, {balance, contributions, interest} ...];
 * @param {int} principal
 * @param {Array} stages - array of stage data
 */
export function getAllYearData(principal, stages) {
  const yearlyData = [];

  stages.forEach((s) => {
    for (let i = 0; i < s.years; i++) {
      const previousYear = yearlyData.at(-1);

      const year = calculateYear(
        previousYear?.balance ?? principal,
        s.regularPayment,
        s.paymentsPerYear,
        s.rate,
        s.compoundsPerYear,
        previousYear?.cumulativeInterest ?? 0,
        previousYear?.cumulativeContributions ?? 0
      );

      yearlyData.push(year);
    }
  });
  return yearlyData;
}
