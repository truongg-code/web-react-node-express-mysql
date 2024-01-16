import React from "react";

const CompleteOrder = () => {
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
          Your order has been confirmed and will be shipped as soon as possible.
          Thank you so much!!!
        </h3>
        <p>
          Go back to the <a href="/">homepage</a>
        </p>
      </div>
    </div>
  );
};

export default CompleteOrder;
