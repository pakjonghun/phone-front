import { useEffect, useState } from 'react';

interface Props {
  text: string;
  delay?: number;
}

export const useDebounce = ({
  text,
  delay = 1000,
}: Props) => {
  const [delayText, setDelayText] = useState(text);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayText(text);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [delay, text]);

  return delayText;
};
