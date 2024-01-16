import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import myQRcode from "../assets/qr_code.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useShoppingContext } from "../contexts/ShoppingContext";

const ModalCompleteOrder = (props) => {
  const { show, handleClose, orderCode } = props;
  const navigate = useNavigate();
  const [valueInput, setValueInput] = useState("");

  const { clearCart } = useShoppingContext();

  const handleClick = () => {
    axios
      .delete(`http://localhost:8081/customer/delete?order_id=${orderCode}`)
      .then((res) => {
        console.log(">> check res delete: ", res);
      })
      .catch((err) => console.log(err));
    handleClose();
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
          transfer content is: 11 banking)
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
            handleClick();
          }}
        >
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            if (valueInput === orderCode.toString()) {
              handleClose();
              clearCart();
              navigate("/complete-order");
              window.location.reload();
            } else {
              alert("Please re-enter your order code");
            }
          }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCompleteOrder;
