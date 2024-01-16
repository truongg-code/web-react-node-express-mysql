import React from "react";
import "../../styles/home.scss";

const Home = () => {
  return (
    <>
      <div className="image-introduce">
        <div className="text-introduce">
          <p>Let&apos;s Create Your</p>
          <h1>Dream Party</h1>
          <p id="achievement-intro">
            Vietnam&apos;s Larget Online Party Supplies Store
          </p>
          <div id="highlight"></div>
          <button id="shop-now-btn">Shop now</button>
        </div>
      </div>
      <div className="shop-categories">
        <p className="section-title">Shop by Categories</p>
        <div className="cate-contain">
          <div className="birthday">
            <button className="birthday-btn">Birthday</button>
          </div>
          <div className="cate-option">
            <div className="cate-option-contain">
              <div className="hanging-decorations">
                <button className="option-btn">Hanging Decorations</button>
              </div>
              <div className="sets">
                <button className="option-btn">Sets</button>
              </div>
            </div>
            <div className="balloons">
              <button className="option-btn">Balloons</button>
            </div>
          </div>
        </div>
      </div>
      <p className="section-title">Our Customers Reviews</p>
    </>
  );
};

export default Home;
