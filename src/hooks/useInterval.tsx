import { useEffect, useRef } from 'react';

const useInterval = (cb: () => void, interval: number | null = 300) => {
  const cbRef = useRef<() => void>();

  useEffect(() => {
    cbRef.current = cb;
  }, [cb]);

  useEffect(() => {
    const tick = () => cbRef.current?.();

    if (interval !== null) {
      const id = setInterval(tick, interval);

      return () => clearInterval(id);
    }
  }, [interval]);
};

export default useInterval;
