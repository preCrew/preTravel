import { useCallback, useEffect, useRef } from 'react';
import tw from 'twin.macro';

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
        if (entry.intersectionRatio >= 1.0) {
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

  const InfiniteScrollPositionComponent = () => (
    <div
      ref={lastScrollRef}
      css={tw`w-full h-1`}
    />
  );

  return { InfiniteScrollPositionComponent, lastScrollRef };
};

export default useInfinityScroll;
