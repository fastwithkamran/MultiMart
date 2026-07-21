import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { LoginPage } from "./pages";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<LoginPage />} />
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
