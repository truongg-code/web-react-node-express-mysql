import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import myQRcode from "../assets/qr_code.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useShoppingContext } from "../contexts/ShoppingContext";
import { getCheckBankingCustomer } from "../services/Service";

const ModalCompleteOrder = (props) => {
  const {
    show,
    handleClose,
    orderCode,
    email,
    firstName,
    lastName,
    streetAddress,
    district,
    city,
    phone,
    paymentMethod,
  } = props;

  const navigate = useNavigate();
  const [valueInput, setValueInput] = useState("");
  const [loadingConfirm, setLoadingConfirm] = useState(false);

  const { clearCart, totalPrice, cartItems } = useShoppingContext();

  const handleClickClose = () => {
    handleClose();
  };

  const handleClickConfirm = async () => {
    setLoadingConfirm(true);
    const res = await getCheckBankingCustomer(orderCode);
    let isPay;
    if (res.length > 0) isPay = 1;
    else isPay = 0;
    if (valueInput === orderCode.toString()) {
      const userCart = JSON.stringify(cartItems);
      setTimeout(() => {
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
            orderCode,
            isPay,
          })
          .then((res) => {
            console.log(">> check res", res.data.Message);
          })
          .catch((err) => console.log(err));
        localStorage.setItem("order_code", orderCode);

        handleClose();
        clearCart();
        navigate("/complete-order");
        window.location.reload();
      }, 10000);
    } else {
      alert("Please re-enter your order code");
      setLoadingConfirm(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Your Order Code is: {orderCode}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <b>
          Please transfer money to me using the following QR code if you choose
          a bank before confirming the order with the transfer content being:
          "order_code banking" (For example, if your order code is 11, the
          transfer content is: <span style={{ color: "red" }}>11 banking</span>)
        </b>
        <br />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <img src={myQRcode} alt="my qr code" width={100} height={100} />
          <div className="infor_banking pt-2">
            <p>
              <b>Bank</b>: MB Bank
            </p>
            <p>
              <b>Account Number</b>: 0332908528
            </p>
            <p>
              <b>Account Name</b>: Nguyen Van Truong
            </p>
          </div>
        </div>
        <div style={{ textAlign: "center", fontWeight: "600" }}>
          Type <span style={{ color: "red" }}>{orderCode}</span> into the input
          to confirm
        </div>
        <input
          type="text"
          placeholder="Type your order code to confirm"
          style={{
            width: "100%",
            marginTop: "1em",
            padding: "10px",
            borderRadius: "0.3em",
            border: "1px solid black",
          }}
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            handleClickClose();
          }}
        >
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            handleClickConfirm();
          }}
        >
          {loadingConfirm && <i className="fas fa-circle-notch fa-spin"></i>}
          &nbsp; Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCompleteOrder;
