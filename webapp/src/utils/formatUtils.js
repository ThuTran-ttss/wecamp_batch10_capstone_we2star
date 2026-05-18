export function formatCurrency(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return "0";
  }

  return amount.toLocaleString("en-US");
}
