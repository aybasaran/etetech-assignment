import React from "react";
import ReactDOM from "react-dom/client";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CompanyDelete from "./pages/CompanyDelete";
import CompanyEdit from "./pages/CompanyEdit";
import Company from "./pages/Company";

import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CompanyCreate from "./pages/CompanyCreate";

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
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
