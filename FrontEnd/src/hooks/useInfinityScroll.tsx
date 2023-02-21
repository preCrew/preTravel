import {
  MutableRefObject,
  RefObject,
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

interface args {
  onIntersect: () => void;
  options?: IntersectionObserverInit;
}

const defaultOptions: IntersectionObserverInit = {
  // root: null,
  rootMargin: '0px',
  threshold: 1.0,
};

const useInfinityScroll = (
  onIntersect: () => void,
  options: IntersectionObserverInit = defaultOptions,
) => {
  const lastScrollRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver>();

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      });
    },
    [observer.current],
  );

  useEffect(() => {
    if (lastScrollRef.current) {
      observer.current?.disconnect;
      observer.current = new IntersectionObserver(handleIntersect, options);
      observer.current.observe(lastScrollRef.current);
    }
  }, [lastScrollRef.current]);

  return { lastScrollRef };
};

export default useInfinityScroll;
