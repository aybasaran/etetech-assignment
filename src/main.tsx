import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// PAGES
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

// Product
import Product from "./pages/Product";
import ProductDelete from "./pages/ProductDelete";
import ProductEdit from "./pages/ProductEdit";
import ProductCreate from "./pages/ProductCreate";

// Company
import Company from "./pages/Company";
import CompanyCreate from "./pages/CompanyCreate";
import CompanyDelete from "./pages/CompanyDelete";
import CompanyEdit from "./pages/CompanyEdit";

// Auth related
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/profile";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/company",
    element: <Company />,
  },
  {
    path: "/company/:id/delete",
    element: <CompanyDelete />,
  },
  {
    path: "/company/:id/edit",
    element: <CompanyEdit />,
  },
  {
    path: "/company/create",
    element: <CompanyCreate />,
  },
  {
    path: "/product",
    element: <Product />,
  },
  {
    path: "/product/:id/delete",
    element: <ProductDelete />,
  },
  {
    path: "/product/:id/edit",
    element: <ProductEdit />,
  },
  {
    path: "/product/create",
    element: <ProductCreate />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
