import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from '@/app/router/AppRouter';

export const RouterProvider = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};
