import { useEffect, useLayoutEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

const useSearchParamsWithError = <T,>(
  searchKeys: string[],
  onError: () => void,
): T => {
  const [searchParams, _] = useSearchParams();

  useEffect(() => {
    const errorCondition = searchKeys.some(key => !searchParams.get(key));
    if (errorCondition) {
      console.log(searchParams, searchKeys);
      onError();
      throw Error('주소에 queryString 정보가 부족합니다.', {
        cause: 'queryString',
      });
    }
  }, []);

  return Object.fromEntries(searchParams) as T;
};

export default useSearchParamsWithError;
