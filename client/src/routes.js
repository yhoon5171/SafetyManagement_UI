import React from "react";
import { Navigate } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import All from "./components/pages/All";
import CCTV from "./components/pages/CCTV";
import Documents from "./components/pages/Documents";
import CheckList from "./components/pages/CheckList";
import Temp from "./components/pages/Temp";
import Pressure from "./components/pages/Pressure";
import Ray from "./components/pages/Ray";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    element: 'All',
    component: () => <Navigate to="/all" />
  },
  {
    path: "/all",
    layout: DefaultLayout,
    element: 'All',
    component: All
  },
  {
    path: "/cctv",
    layout: DefaultLayout,
    element: 'CCTV',
    component: CCTV
  },
  {
    path: "/documents",
    layout: DefaultLayout,
    element: 'Documents',
    component: Documents
  },
  {
    path: "/checklists",
    layout: DefaultLayout,
    element: 'CheckList',
    component: CheckList
  },
  {
    path: "/temperature",
    layout: DefaultLayout,
    element: 'Temp',
    component: Temp
  },
  {
    path: "/pressure",
    layout: DefaultLayout,
    element: 'Pressure',
    component: Pressure
  },
  {
    path: "/ray",
    layout: DefaultLayout,
    element: 'Ray',
    component: Ray
  }
];
