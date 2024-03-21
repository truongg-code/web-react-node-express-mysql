import React, { useState } from "react";
import "./checkout.scss";
import { useShoppingContext } from "../../../contexts/ShoppingContext";
import ModalCompleteOrder from "../../../components/ModalCompleteOrder";
import { countOrderCodeDuplicated } from "../../../services/Service";

const CheckOut = () => {
  const { cartItems, totalPrice } = useShoppingContext();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [numberAdress, setNumberAdress] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [wardAddress, setWardAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderCode, setOrderCode] = useState("");

  const [isShowModalCompleteOrder, setIsShowModalCompleteOrder] =
    useState(false);

  const generateRandomString = () => {
    // generate random number from 0 to 999999
    const randomNumber = Math.floor(Math.random() * 1000000);

    // Format the number to have 6 digits, adding zeroes if necessary
    const formattedString = String(randomNumber).padStart(6, "0");

    return formattedString;
  };

  const handleSubmit = async () => {
    let orderCodeCurrent = await generateRandomString();

    const res = await countOrderCodeDuplicated(orderCodeCurrent);
    let countOrderDuplicated = res[0].count;
    if (countOrderDuplicated !== 0) console.log("order duplicated!");
    else {
      console.log("order is created!");
      console.log(orderCodeCurrent);
    }

    // if count > 0 => duplicated, need generate ordercode again
    while (countOrderDuplicated !== 0) {
      orderCodeCurrent = await generateRandomString();
      const res = await countOrderCodeDuplicated(orderCodeCurrent);
      countOrderDuplicated = res[0].count;
      if (countOrderDuplicated === 0) {
        break;
      }
    }

    setOrderCode(orderCodeCurrent);
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

          <div className="d-flex justify-content-between">
            <input
              type="text"
              placeholder="Number address"
              style={{ width: "48%" }}
              value={numberAdress}
              onChange={(e) => setNumberAdress(e.target.value)}
            />
            <input
              type="text"
              placeholder="Street address"
              style={{ width: "48%" }}
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
          </div>

          <input
            type="text"
            placeholder="Ward address"
            required
            value={wardAddress}
            onChange={(e) => setWardAddress(e.target.value)}
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
                  !numberAdress ||
                  !streetAddress ||
                  !wardAddress ||
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
              email={email}
              firstName={firstName}
              lastName={lastName}
              numberAdress={numberAdress}
              streetAddress={streetAddress}
              wardAddress={wardAddress}
              district={district}
              phone={phone}
              city={city}
              paymentMethod={paymentMethod}
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

export default CheckOut;
