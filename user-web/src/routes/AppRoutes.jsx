import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import Products from "../pages/Products";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Registeration";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import OrderConfirmation from "../pages/OrderConfirmation";
import PaymentPage from "../pages/Payment";
import Profile from "../pages/Profile";
import Wishlist from "../pages/Wishlist";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsConditions from "../pages/TermConditions";
import ReturnPolicy from "../pages/ReturnPolicy";
import AboutUs from "../pages/About";
import MainAboutUs from "../pages/MainAboutus";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    alert("Please login to continue!");
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES - No login needed */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/aboutus" element={<MainAboutUs />} />
        <Route path="/product" element={<Products />} />
        <Route path="/productdetail/:id" element={<ProductDetail />} />
        <Route path="/productdetail/combo/:id" element={<ProductDetail />} />

        {/* PROTECTED ROUTES - Login required */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orderconfirm"
          element={
            <ProtectedRoute>
              <OrderConfirmation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
<Route path="/terms-conditions" element={<TermsConditions />} />
<Route path="/return-policy" element={<ReturnPolicy />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
