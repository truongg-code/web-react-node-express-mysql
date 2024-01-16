import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./components/link-route/Home";
import "./styles/global.scss";
import Footer from "./components/Footer";
import ContactUs from "./components/link-route/ContactUs";
import FeedBack from "./components/Feedback";
import ShopAll from "./components/link-route/ShopAll";
import ProductDetail from "./components/link-route/ProductDetail";
import Cart from "./components/link-route/Cart";
import Checkout from "./components/link-route/Checkout";
import Error from "./components/link-route/Error";
import Login from "./components/link-route/Login";
import Register from "./components/link-route/Register";
import CompleteOrder from "./components/link-route/CompleteOrder";

function App() {
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections/shop-all" element={<ShopAll />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route
          path="/collections/shop-all/products/:slug"
          element={<ProductDetail />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account/login" element={<Login />} />
        <Route path="/account/register" element={<Register />} />

        <Route path="/complete-order" element={<CompleteOrder />} />
        <Route path="*" element={<Error />} />
      </Routes>
      {/* chỉ hiển thị feedback với những trang không phải /cart */}
      {window.location.pathname !== "/cart" &&
        window.location.pathname !== "/checkout" &&
        window.location.pathname !== "/complete-order" && <FeedBack />}
      <Footer />
    </div>
  );
}

export default App;
