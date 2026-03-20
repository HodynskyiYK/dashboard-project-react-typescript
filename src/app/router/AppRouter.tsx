import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { routes } from './routes';
import { routeElements } from './routeElements';

export const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map((route) => {
          const Component = routeElements[route.element];
          return (
            <Route key={route.path} path={route.path} element={<Component />} />
          );
        })}
      </Routes>
    </Suspense>
  );
};
