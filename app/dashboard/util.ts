export function getCurrencyToKRW(number: number) {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(number);
}

export function getWithCommaNumber(number: number) {
  return new Intl.NumberFormat('ko-KR', {
    style: 'decimal',
    useGrouping: true,
  }).format(number);
}
