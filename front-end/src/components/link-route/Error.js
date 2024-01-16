import React from "react";
import "../../styles/pages/error.scss";

const Error = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1>404</h1>
        <h3>SORRY! PAGE YOU ARE LOOKING CAN’T BE FOUND.</h3>
        <p>
          Go back to the <a href="/">homepage</a>
        </p>
      </div>
    </div>
  );
};

export default Error;
