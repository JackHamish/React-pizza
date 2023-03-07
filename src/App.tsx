import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";

import "./scss/app.scss";

const Cart = React.lazy(() => import("./pages/Cart"));
const FullPizza = React.lazy(() => import("./pages/FullPizza"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="" element={<Home />} />
                <Route
                    path="cart"
                    element={
                        <Suspense fallback={<h1>Loading...</h1>}>
                            <Cart />
                        </Suspense>
                    }
                />
                <Route
                    path="pizza/:id"
                    element={
                        <Suspense fallback={<h1>Loading...</h1>}>
                            <FullPizza />
                        </Suspense>
                    }
                />
                <Route
                    path="*"
                    element={
                        <Suspense fallback={<h1>Loading...</h1>}>
                            <NotFound />
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    );
}

export default App;
