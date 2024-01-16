import React from "react";
import "../../styles/contactus.scss";

const ContactUs = () => {
  return (
    <>
      <div className="content-contact">
        <h3>CONTACT US</h3>
        <p>
          We love to hear from you and always ready to assist you, If you have
          any query feel Free to contact us via Chat or
        </p>
        <p>Or Call Us</p>
        <div className="infor_communication">
          <i className="fa-solid fa-phone"></i>
          0332908528
        </div>
        <br />
        <div className="infor_communication">
          <i className="fa-solid fa-location-dot"></i>
          infor@dreamparty.pk
        </div>
      </div>
      <p className="section-title">What Customers Say About Us</p>
    </>
  );
};

export default ContactUs;
