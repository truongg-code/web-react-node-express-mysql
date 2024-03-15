import React from "react";
import "./quickcart.scss";
import { useNavigate, Link } from "react-router-dom";
import CartItem from "../CartItem";
import { useShoppingContext } from "../../contexts/ShoppingContext";

const QuickCart = ({ show, handleClose }) => {
  const { cartItems, totalPrice } = useShoppingContext();
  console.log(">> check cartItems: ", cartItems);
  const navigate = useNavigate();
  return (
    <div className={`quick-cart-container ${show === true ? "active" : ""}`}>
      <div
        className={`quick-cart-place col-12 col-lg-4 col-md-6 ${
          show === true ? "active" : ""
        }`}
      >
        <div className="quick-cart-header col-12 col-lg-4 col-md-6">
          <h3>SHOPPING CART</h3>
          <div className="icon-x">
            <i className="fa-solid fa-xmark" onClick={() => handleClose()}></i>
          </div>
        </div>

        <div className="cart-list">
          {cartItems && cartItems.length === 0 ? (
            <div className="no-item">
              <i className="fa-solid fa-cart-arrow-down"></i>
              <p>Your cart is empty</p>
              <div
                className="return-to-shop"
                onClick={() => {
                  navigate("/collections/shop-all");
                  handleClose();
                }}
              >
                RETURN TO SHOP
              </div>
            </div>
          ) : (
            cartItems.map((item) => {
              return <CartItem key={`cart-item-${item.ID}`} {...item} />;
            })
          )}
        </div>

        <div className="quick-cart-footer col-12 col-lg-4 col-md-6">
          <h3>Subtotal: ${totalPrice}</h3>
          <p style={{ color: "rgba(0, 0, 0, 0.4)" }}>
            Taxes and shipping caculated at checkout
          </p>
          <div className="quick-cart-btn-container">
            <button className="view-cart-btn" onClick={() => handleClose()}>
              <a
                href="/cart"
                style={{
                  textDecoration: "none",
                  color: "var(--color-text-hover)",
                }}
              >
                VIEW CART
              </a>
            </button>
            <button
              className="check-out-btn"
              onClick={() => {
                handleClose();
              }}
            >
              <a
                href="/checkout"
                style={{ textDecoration: "none", color: "#000" }}
              >
                CHECK OUT
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickCart;
