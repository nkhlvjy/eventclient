import React from "react";
import {
  RouteObject,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "../components/Login";
import Events from "../components/Events";

const routeObjects: RouteObject[] = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Events />,
  },
];

const router = createBrowserRouter(routeObjects);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
