import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import myQRcode from "../../assets/qr_code.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ShoppingContext,
  useShoppingContext,
} from "../../contexts/ShoppingContext";
import { getCheckBankingCustomer } from "../../services/Service";

const ModalCompleteOrder = (props) => {
  const {
    show,
    handleClose,
    orderCode,
    email,
    firstName,
    lastName,
    numberAdress,
    streetAddress,
    wardAddress,
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

  const shoppingCartConvertInGHN = (cart) => {
    let cartConvertGHN = cart.map((item) => ({
      name: item.product_name,
      quantity: item.qty,
    }));
    return cartConvertGHN;
  };

  const handleClickConfirm = async () => {
    setLoadingConfirm(true);
    let fullName = firstName + lastName;
    let address =
      numberAdress +
      " " +
      streetAddress +
      " " +
      wardAddress +
      " " +
      district +
      " " +
      city;

    let addressGHN = streetAddress + " " + district + " " + city;
    const res = await getCheckBankingCustomer(orderCode);
    let isPay;
    if (res.length > 0) isPay = 1;
    else isPay = 0;
    if (valueInput.trim() === orderCode.toString()) {
      let userCart = JSON.stringify(cartItems);
      // setTimeout(() => {
      await axios
        .post("http://localhost:8081/customer/create", {
          email,
          firstName,
          lastName,
          address,
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

      try {
        const response = await axios.post(
          "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create",
          {
            payment_type_id: 2,
            note: "Tintest 123",
            required_note: "KHONGCHOXEMHANG",
            return_phone: "0332190158",
            return_address: "39 NTT",
            return_district_id: null,
            return_ward_code: "",
            client_order_code: "",
            from_name: "Nguyễn Trường",
            from_phone: "0332908528",
            from_address:
              "Ngõ 120 Trần Bình, Phường Mỹ Đình 2, Quận Nam Từ Liêm, Hà Nội, Vietnam",
            from_ward_name: "Phường Mỹ Đình 2",
            from_district_name: "Quận Nam Từ Liêm",
            from_province_name: "Hà Nội",
            to_name: fullName,
            to_phone: phone,
            to_address: addressGHN,
            to_ward_name: wardAddress,
            to_district_name: district,
            to_province_name: city,
            cod_amount: totalPrice,
            content: "Theo New York Times",
            weight: 200,
            length: 1,
            width: 19,
            height: 10,
            cod_failed_amount: 2000,
            pick_station_id: 1444,
            deliver_station_id: null,
            insurance_value: totalPrice,

            service_type_id: 2,
            coupon: null,
            pick_shift: [2],
            items: shoppingCartConvertInGHN(cartItems),
          },
          {
            headers: {
              "Content-Type": "application/json",
              ShopId: "190823",
              Token: "8efb0299-b8fc-11ee-8bfa-8a2dda8ec551",
            },
          }
        );

        console.log(">> check res:", response.data.data);
      } catch (error) {
        console.log(error);
      }

      setLoadingConfirm(false);
      handleClose();
      //   clearCart();
      //   navigate("/complete-order");
      //   window.location.reload();
      // }, 10000);
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
