import Header from "./components/Layout/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/USER/Home";
import "./styles/global.scss";
import Footer from "./components/Layout/Footer";
import ContactUs from "./pages/USER/CheckOut";
import FeedBack from "./components/Feedback";
import ShopAll from "./pages/USER/ShopAll";
import ProductDetail from "./pages/USER/ProductDetail";
import Cart from "./pages/USER/Cart";
import Checkout from "./pages/USER/CheckOut";
import Error from "./pages/USER/Error";
import Login from "./pages/USER/Login";
import Register from "./pages/USER/Register";
import CompleteOrder from "./pages/USER/CompleteOrder";

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
