import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import ProtectedRoute from "./ProtectedRoute.jsx";
import SellerProtectedRoute from "./SellerProtectedRoute.jsx";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  CheckoutPage,
  OrderSuccessPage,
  ProductDetailsPage,
  ProfilePage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
  ShopHomePage,
} from "./pages";
import Store from "./redux/store.js";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Home Route */}
      <Route path="/" element={<HomePage />} />
      {/* Auth ROutes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignupPage />} />
      {/* Nav Items Routes */}
      <Route path="/products" element={<ProductPage />} />
      <Route path="/best-selling" element={<BestSellingPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/faq" element={<FAQPage />} />
      {/* Product Routes */}
      <Route path="/product/:name" element={<ProductDetailsPage />} />
      <Route path="/order/success/:id" element={<OrderSuccessPage />} />
      {/* Shop Routes */}
      <Route path="/shop-create" element={<ShopCreatePage />} />
      <Route path="/shop-login" element={<ShopLoginPage />} />
      <Route
        path="/shop/:id"
        element={
          <SellerProtectedRoute>
            <ShopHomePage />
          </SellerProtectedRoute>
        }
      />
      {/* Activation Routes */}
      <Route
        path="/activation/:activation_token"
        element={<ActivationPage />}
      />
      <Route
        path="/seller/activation/:activation_token"
        element={<SellerActivationPage />}
      />
      {/* Protected Routes */}
      {/* CheckOut Route */}
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />
      {/* Profile Route */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <RouterProvider router={router} />
  </Provider>,
);
