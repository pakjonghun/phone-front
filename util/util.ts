import dayjs from 'dayjs';

export const client = (fetch: Promise<Response>) => {
  return fetch
    .then(async (res) => {
      if (!res.ok) {
        const response = await res.json();
        throw new Error(response.message);
      }
      return res.json();
    })
    .catch((err) => console.error(err));
};

const isNotNumber = (number: unknown) => {
  const isNan = isNaN(Number(number));
  return !isNan;
};

export function getCurrencyToKRW(number: number) {
  let _number = number;
  const isNumber = isNotNumber(number);
  if (!isNumber) {
    _number = 0;
  }

  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(_number);
}

export function getWithCommaNumber(number: number) {
  let _number = number;
  const isNumber = isNotNumber(number);
  if (!isNumber) {
    _number = 0;
  }

  return new Intl.NumberFormat('ko-KR', {
    style: 'decimal',
    useGrouping: true,
  }).format(_number);
}

export function getTwoRoundedNumber(number: number) {
  const initNumber = number * 10;

  const result =
    number < 0
      ? Math.ceil(initNumber) / 10
      : Math.floor(initNumber) / 10;
  return isNaN(result) ? 0 : result;
}

export function getDateFormat(date: string) {
  return dayjs(date).format('YYYY년 MM월 DD일');
}

export function getTimeFormat(date: Date) {
  return dayjs(date).format('HH시 mm분 ss초');
}
