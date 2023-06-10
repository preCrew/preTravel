import { useEffect, useLayoutEffect } from 'react';
import { FallbackProps } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return <>{/* <div>asdf</div> */}</>;
};

export default ErrorFallback;
