import { useEffect, useState } from 'react';

interface Props {
  callback: IntersectionObserverCallback;
  option?: IntersectionObserverInit;
}

const useInfinity = ({
  callback,
  option = { threshold: 0.7 },
}: Props) => {
  const [ref, setRef] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      callback,
      option
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, [callback, ref, option]);

  return setRef;
};

export default useInfinity;
