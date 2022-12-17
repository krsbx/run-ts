import React, { useEffect, useState } from 'react';

const useIsInViewport = (
  ref: React.MutableRefObject<HTMLElement> | React.RefObject<HTMLElement>
) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref.current]); // eslint-disable-line react-hooks/exhaustive-deps

  return isInView;
};

export default useIsInViewport;
