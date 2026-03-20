import { lazy } from 'react';

export const routeElements = {
  home: lazy(() =>
    import('@/pages/home').then((m) => ({ default: m.HomePage })),
  ),
};

export type RouteElementKey = keyof typeof routeElements;
