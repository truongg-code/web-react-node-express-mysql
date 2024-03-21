import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const CompleteOrder = () => {
  // useEffect(()=> {
  //   localStorage.getItem("order_code");
  // },[])
  return (
    <div className="error-container">
      <div className="error-content">
        <h1>
          ORDER SUCCESS&nbsp;
          <i
            className="fa-regular fa-circle-check"
            style={{ color: "rgba(31, 245, 33, 0.8)" }}
          ></i>
        </h1>
        <h3>
          Your code order is:{" "}
          <span style={{ color: "var(--color-text-hover)" }}>
            {localStorage.getItem("order_code")}
          </span>
        </h3>
        <h3>
          It has been confirmed and will be shipped as soon as possible. Thank
          you so much!!!
        </h3>
        <h5>
          Go back to the{" "}
          <Link to="/" onClick={() => localStorage.removeItem("order_code")}>
            homepage
          </Link>
        </h5>
        <p>
          Look up order <a href="#">here</a>
        </p>
      </div>
    </div>
  );
};

export default CompleteOrder;
