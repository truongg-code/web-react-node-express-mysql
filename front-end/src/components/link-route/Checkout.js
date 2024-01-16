import React, { useState } from "react";
import "../../styles/pages/checkout.scss";
import { useShoppingContext } from "../../contexts/ShoppingContext";
import axios from "axios";
import ModalCompleteOrder from "../ModalCompleteOrder";

const Checkout = () => {
  const { cartItems, totalPrice } = useShoppingContext();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderCode, setOrderCode] = useState("");

  const [isShowModalCompleteOrder, setIsShowModalCompleteOrder] =
    useState(false);

  const handleSubmit = () => {
    const userCart = JSON.stringify(cartItems);
    axios
      .post("http://localhost:8081/customer/create", {
        email,
        firstName,
        lastName,
        streetAddress,
        district,
        city,
        phone,
        userCart,
        paymentMethod,
        totalPrice,
      })
      .then((res) => {
        console.log(">> check res", res.data.Message);
        setOrderCode(res.data.Message);
      })
      .catch((err) => console.log(err));
    setIsShowModalCompleteOrder(true);
  };

  const handleClose = () => {
    setIsShowModalCompleteOrder(false);
  };

  return (
    <div className="checkout-container">
      <div className="personal-checkout-container ">
        <div className="personal-infor-place col-12 col-md-10">
          <div className="contact-container">
            <div className="contact-header d-flex justify-content-between align-items-center mb-2">
              <h3>Contact</h3>
              <div style={{ color: "rgba(0,0,0,0.4)" }}>
                Have an account? &nbsp;
                <a href="#">Log in</a>
              </div>
            </div>
            <input
              type="email"
              placeholder="Email"
              id="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="delivery-container">
            <h3>Delivery</h3>
            <div>
              <span style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.8em" }}>
                Country/Region
              </span>
              <input type="text" value="Viet Nam" disabled id="country-input" />
            </div>
          </div>

          <div className="name-container">
            <input
              type="text"
              placeholder="First Name"
              id="name-input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              id="name-input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <input
            type="text"
            placeholder="Street address"
            id="email-input"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
          />
          <div className="d-flex justify-content-between">
            <input
              type="text"
              placeholder="District"
              style={{ width: "48%" }}
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />
            <input
              type="text"
              placeholder="City"
              style={{ width: "48%" }}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <input
            type="text"
            placeholder="Phone"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <h3 style={{ fontSize: "0.9em", marginTop: "1em" }}>
            Shipping method
          </h3>
          <div className="method-container">
            <input type="text" value="Standard" disabled id="method-input" />
            <span>$5</span>
          </div>

          <div className="payment-container">
            <h3>Payment</h3>
            <div className="payment-wrapper">
              <input type="radio" name="select" id="payment-on-delivery" />
              <input type="radio" name="select" id="payment-through-bank" />

              <label
                htmlFor="payment-on-delivery"
                name="select"
                className="option option-delivery"
                onClick={() => setPaymentMethod("cash")}
              >
                <div className="dot"></div>
                <span>Cash on Delivery</span>
              </label>
              <label
                name="select"
                htmlFor="payment-through-bank"
                className="option option-bank"
                onClick={() => setPaymentMethod("banking")}
              >
                <div className="dot"></div>
                <span>Bank through Viettin Bank</span>
              </label>
              <div className="receiver_information">
                <p>Account Number: 123456789</p>
                <p>Bank Name: Nguyen Van Truong</p>
              </div>
            </div>
            <button
              className="complete-btn"
              onClick={() => {
                if (
                  !email ||
                  !firstName ||
                  !lastName ||
                  !streetAddress ||
                  !district ||
                  !city ||
                  !phone ||
                  !paymentMethod
                ) {
                  alert("All feilds are required");
                } else handleSubmit();
              }}
            >
              Complete order
            </button>
            <ModalCompleteOrder
              show={isShowModalCompleteOrder}
              handleClose={handleClose}
              orderCode={orderCode}
            />
          </div>
        </div>
      </div>
      <div className="cart-checkout-container ">
        <div className="cart-infor-place col-12 col-md-10">
          {cartItems &&
            cartItems.map((item) => (
              <div className="item-cart-container" key={cartItems.ID}>
                <div className="image-item-cart">
                  <img
                    src={item.path_image}
                    alt="item cart"
                    width={100}
                    height={100}
                  />
                  <div className="item-cart-quantity">{item.qty}</div>
                </div>
                <p className="name-item">{item.product_name}</p>
                <p>${item.price}</p>
              </div>
            ))}
          <div className="subtotal">
            <p>Subtotal</p>
            <p>${totalPrice}</p>
          </div>

          <div className="shipping">
            <p>Shipping</p>
            <p>$5</p>
          </div>
          <div className="total">
            <p>Total</p>
            <p>${totalPrice + 5}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;