import { useEffect, useRef, useState } from 'react';

const useBoundingClientRect = () => {
  const [rect, setRect] = useState<DOMRect | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const { current } = ref;
    if (current) {
      const rect = current.getBoundingClientRect();
      setRect(rect);
    }
  }, []);
  return { ref, rect };
};

export default useBoundingClientRect;
