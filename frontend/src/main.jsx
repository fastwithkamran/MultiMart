import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { ProtectedRoute, SellerProtectedRoute } from "./routes";
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
  PaymentPage,
  ShopDashboardPage,
  ShopCreateProductPage,
  ShopAllProductsPage,
  ShopCreateEventPage,
  ShopAllEventsPage,
  ShopAllCouponsPage,
  ShopPreviewPage,
  ShopAllOrdersPage,
  ShopOrderDetailsPage,
  OrdersDetailsPage,
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
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      {/* Payment */}
      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <PaymentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order/success"
        element={
          <ProtectedRoute>
            <OrderSuccessPage />
          </ProtectedRoute>
        }
      />
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
      <Route
        path="/dashboard"
        element={
          <SellerProtectedRoute>
            <ShopDashboardPage />
          </SellerProtectedRoute>
        }
      />
      <Route
        path="/dashboard-create-product"
        element={
          <SellerProtectedRoute>
            <ShopCreateProductPage />
          </SellerProtectedRoute>
        }
      />
      <Route
        path="/dashboard-products"
        element={
          <SellerProtectedRoute>
            <ShopAllProductsPage />
          </SellerProtectedRoute>
        }
      />
      <Route
        path="/dashboard-orders"
        element={
          <SellerProtectedRoute>
            <ShopAllOrdersPage />
          </SellerProtectedRoute>
        }
      />
      <Route
        path="/order/:id"
        element={
          <SellerProtectedRoute>
            <ShopOrderDetailsPage />
          </SellerProtectedRoute>
        }
      />
      <Route
        path="/dashboard-create-event"
        element={
          <SellerProtectedRoute>
            <ShopCreateEventPage />
          </SellerProtectedRoute>
        }
      />
      <Route
        path="/dashboard-events"
        element={
          <SellerProtectedRoute>
            <ShopAllEventsPage />
          </SellerProtectedRoute>
        }
      />
      <Route
        path="/dashboard-coupons"
        element={
          <SellerProtectedRoute>
            <ShopAllCouponsPage />
          </SellerProtectedRoute>
        }
      />
      <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
      {/* Activation Routes */}
      <Route
        path="/activation/:activation_token"
        element={<ActivationPage />}
      />
      <Route
        path="/seller/activation/:activation_token"
        element={<SellerActivationPage />}
      />
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
      <Route
        path="/user/order/:id"
        element={
          <ProtectedRoute>
            <OrdersDetailsPage />
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
