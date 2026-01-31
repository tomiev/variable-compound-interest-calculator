/**
 * Returns the total balance, contributions, and interest earned during
 * an investment period.
 * @param {int} principal - Starting balance
 * @param {int} payment - Regular payment amount
 * @param {int} paymentsPerYear - Number of regular payments made in a year
 * @param {int} rate - Annual interest rate (e.g. 10 = 10%)
 * @param {int} compoundsPerYear - Number of times interest is applied annually
 * @param {int} years - Number of years to use for this stage
 */
export function compound(principal, payment, paymentsPerYear, rate, compoundsPerYear, years) {
  const decimalRate = rate / 100;
  const principalGrowthFactor = (1 + decimalRate / compoundsPerYear) ** (compoundsPerYear * years);
  const grownPrincipal = principal * principalGrowthFactor;

  const paymentGrowthFactor = (1 + decimalRate / compoundsPerYear) ** (compoundsPerYear / paymentsPerYear) - 1;
  const grownPayments = payment * ((1 + paymentGrowthFactor) ** (paymentsPerYear * years) - 1) / paymentGrowthFactor;

  const balance = grownPrincipal + grownPayments;
  const contributions = principal + (payment * paymentsPerYear * years);

  return {
    balance: balance,
    contributions: contributions,
    interest: balance - contributions
  }
}

// TODO pick a graphing solution and data structure.
// To graph the results, I need to have the cumulative balance, contributions, and interest at the end of each year.
// e.g. if 5 years, something like:
// let data = [];
// for (i = 0; i<5; i++) {data.push(compound(x, y, z))}
