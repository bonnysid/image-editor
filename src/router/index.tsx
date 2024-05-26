import React, {FC, Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import {publicRoutes} from "@src/router/routes";

const AppRouter: FC = () => {
    return (
        <Suspense fallback={'Loading...'}>
            <Routes>
                {publicRoutes.map(route => (
                    <Route
                        key={route.path}
                        {...route}
                    />
                ))}
            </Routes>
        </Suspense>
    );
};

export {AppRouter};