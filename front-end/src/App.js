import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/USER/Home";
import "./styles/global.scss";
import Cart from "./pages/USER/Cart";
import React, { Suspense } from "react";
import Layout from "../src/components/Layout";
import LayoutFeedBack from "../src/components/Layout/component/LayoutFeedBack";
import Loading from "./components/Loading";

const ContactUs = React.lazy(() => import("./pages/USER/ContactUs"));
const ShopAll = React.lazy(() => import("./pages/USER/ShopAll"));
const ProductDetail = React.lazy(() => import("./pages/USER/ProductDetail"));
const CheckOut = React.lazy(() => import("./pages/USER/CheckOut"));
const Error = React.lazy(() => import("./pages/USER/Error"));
const Login = React.lazy(() => import("./pages/USER/Login"));
const Register = React.lazy(() => import("./pages/USER/Register"));
const CompleteOrder = React.lazy(() => import("./pages/USER/CompleteOrder"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<LayoutFeedBack />}>
          <Route index element={<Home />} />

          <Route path="/collections/shop-all" element={<ShopAll />} />

          <Route path="/contact-us" element={<ContactUs />} />
          <Route
            path="/collections/shop-all/products/:slug"
            element={<ProductDetail />}
          />
        </Route>

        <Route path="/" element={<Layout />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/complete-order" element={<CompleteOrder />} />
          <Route path="/account">
            <Route index element={<Navigate to="/account/login" replace />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
