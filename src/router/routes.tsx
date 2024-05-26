import React, { lazy } from 'react';

const MainPage = lazy(async () => import('@src/pages/Main'));

interface Route {
    path: string;
    exact?: boolean;
    element: React.ReactElement;
}

enum PublicRouteNames {
    MAIN = '/',
}

const publicRoutes: Route[] = [
    { path: PublicRouteNames.MAIN, element: <MainPage />, exact: true },
];

export { publicRoutes, PublicRouteNames };