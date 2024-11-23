import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router/router.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider
      router={{
        ...router,
        future: {
          v7_startTransition: true,
          v7_relativeSplatPath: true,
          v7_fetcherPersist: true,
          v7_normalizeFormMethod: true,
          v7_partialHydration: true,
          v7_skipActionErrorRevalidation: true,
        },
      }}
    />
  </StrictMode>,
);
