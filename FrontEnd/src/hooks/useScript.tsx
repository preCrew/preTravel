import { useEffect, useState } from 'react';

export const useScript = (src: string) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let script: HTMLScriptElement | null = document.querySelector(
      `script[src="${src}"]`,
    );
    if (!script) {
      script = document.createElement('script');
      script.src = src;
      script.async = true;
    }

    const handleLoad = () => {
      console.log('로드즁');
      setSuccess(true);
    };
    const handleError = (error: ErrorEvent) => {
      console.log('에러즁');

      setError(error.message);
    };

    script.addEventListener('load', handleLoad);
    script.addEventListener('error', handleError);

    document.body.append(script);

    return () => {
      if (!script) return;
      script.removeEventListener('load', handleLoad);
      script.removeEventListener('error', handleError);
    };
  }, [src]);

  return [success, error];
};

export default useScript;
