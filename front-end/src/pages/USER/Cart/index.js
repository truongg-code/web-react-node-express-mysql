import React from "react";
import "./cart.scss";
import { useShoppingContext } from "../../../contexts/ShoppingContext";
import { Link, useNavigate } from "react-router-dom";
const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, increaseQty, decreaseQty, totalPrice, removeCartItem } =
    useShoppingContext();
  return (
    <div className="cart-container">
      <div className="name-collection">
        <h5>Shopping Cart</h5>
      </div>
      <div className="row">
        <table className="table ">
          <thead>
            <tr>
              <th className="col-6">PRODUCT</th>
              <th>PRICE</th>
              <th className="ps-4">QUANTITY</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {cartItems &&
              cartItems.map((item) => (
                <tr>
                  <td className="product-place">
                    <img
                      src={item.path_image}
                      alt="product"
                      width={150}
                      height={150}
                    />
                    <div className="short-infor">
                      <a
                        className="name-item"
                        href={`/collections/shop-all/products/`}
                      >
                        {item.product_name}
                      </a>
                      <br />
                      <button
                        className="btn-remove"
                        onClick={() => removeCartItem(item.ID)}
                      >
                        <i className="fa-regular fa-trash-can "></i>
                      </button>
                    </div>
                  </td>
                  <td className="price">${item.price}</td>
                  <td>
                    {" "}
                    <div className="quantity">
                      <button
                        id="decrease"
                        onClick={() => decreaseQty(item.ID)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min={1}
                        max={999}
                        // defaultValue={1}
                        // step={1}
                        value={item.qty}
                      />

                      <button
                        id="increase"
                        onClick={() => increaseQty(item.ID)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="total">${item.price * item.qty}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="notion-container">
        <div className="notion-place">
          <p>Add Order Note</p>
          <input
            type="text"
            className="notion-text"
            placeholder="How can we help you?"
          />

          <p>Coupon</p>
          <span>Coupon code will work on checkout page</span>
          <br />
          <input
            type="text"
            className="coupon-text"
            placeholder="Coupon code"
          />
        </div>
        <div className="price-checkout">
          <h3>Subtotal: ${totalPrice}</h3>
          <p style={{ color: "rgba(0, 0, 0, 0.4)" }}>
            Taxes and shipping caculated at checkout
          </p>

          <div className="quick-cart-btn-container">
            <a
              href="/collections/shop-all"
              style={{
                textDecoration: "none",
                color: "var(--color-text-hover)",
              }}
            >
              <button className="view-cart-btn">CONTINUE SHOPPING</button>
            </a>
            <button
              className="check-out-btn"
              onClick={() => navigate("/checkout")}
            >
              CHECK OUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
