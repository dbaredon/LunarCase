export const formatAmount = (amount: number, currency: string) =>
  new Intl.NumberFormat('en-DK', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount); 