import React from "react";
import "../styles/footer.scss";

const Footer = () => {
  return (
    <>
      <div className="footer-large col-lg-11">
        <div id="footer-infor">
          <div className="communications">
            <i className="fa-solid fa-location-dot"></i>
            Dreamparty.pk
          </div>
          <div className="communications">
            <i className="fa-regular fa-envelope"></i>
            infor@dreamparty.pk
          </div>
          <div className="communications">
            <i className="fa-solid fa-phone"></i>
            0332908528
          </div>
        </div>
        <div id="footer-infor">
          <h6>Category</h6>
          <p>search</p>
        </div>
        <div id="footer-infor">
          <h6>Information</h6>
        </div>
        <div id="footer-infor">
          <h6>Useful links</h6>
        </div>
        <div id="footer-infor">
          <h6>Newletter Signup</h6>
          <p>
            Subscribe to our newsletter and get latest update about our products
          </p>
          <form className="footer-email-form">
            <input
              type="mail"
              placeholder="Your email address"
              id="footer-email"
            />
            <input type="submit" value="Subcribe" id="footer-email-btn" />
          </form>
        </div>
      </div>
      <div className="copyright">
        <p>
          Copyright © 2023 <span>Dream Party</span> all rights reserve
        </p>
      </div>
    </>
  );
};

export default Footer;
