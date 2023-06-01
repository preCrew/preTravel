import * as React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from '@src/pages/';

import '@src/assets/font.css';
import '@src/styles/global.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import OvelayRoot from '@src/hooks/ovelay/OvelayRoot';

const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: twentyFourHoursInMs,
      suspense: true,
    },
  },
});
const container = document.querySelector('#root');

createRoot(container as Element).render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <BrowserRouter>
        <HelmetProvider>
          <App />
          <OvelayRoot />
        </HelmetProvider>
      </BrowserRouter>
    </RecoilRoot>
  </QueryClientProvider>,
);
