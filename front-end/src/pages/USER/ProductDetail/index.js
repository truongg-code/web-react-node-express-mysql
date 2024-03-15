import React, { useState } from "react";
import "./product_detail.scss";
import Product from "../../../components/Product";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProductDetail } from "../../../services/Service";

const ProductPage = () => {
  const [currentProduct, setCurrentProduct] = useState({});
  const [currentImage, setCurrentImage] = useState("");
  const { slug } = useParams();

  useEffect(() => {
    getCurrentProduct();
  }, []);

  const getCurrentProduct = async () => {
    const res = await fetchProductDetail(slug);
    if (res) {
      console.log(">> check res: ", res[0]);
      setCurrentProduct(res[0]);
      setCurrentImage(res[0].path_image);
    }
  };

  return (
    <>
      <div className="path_url">
        <div className="nav_path">
          <nav>
            <a href="/" id="link-navpath">
              Home
            </a>
            {"  "}
            &gt; &nbsp;
            <a href="/" id="link-navpath">
              Wedding
            </a>
            {"  "}
            &gt; &nbsp;{currentProduct.product_name}
          </nav>
        </div>
        <div className="backCate_Page">
          <i className="fa-solid fa-border-all"></i>&nbsp;
          <i className="fa-solid fa-chevron-right"></i>
        </div>
      </div>
      <div className="information_product">
        <div className="image-product">
          <div className="image-detail-item">
            <img
              src={currentProduct.path_image}
              alt="Image_Detail"
              id={`image_detail`}
              height={80}
              width={80}
              className={`${
                currentImage === currentProduct.path_image ? "active" : ""
              }`}
              onClick={() => setCurrentImage(currentProduct.path_image)}
            />
            <img
              src={currentProduct.path_image_2}
              alt="Image_Detail"
              id={`image_detail`}
              height={80}
              width={80}
              className={`${
                currentImage === currentProduct.path_image_2 ? "active" : ""
              }`}
              onClick={() => setCurrentImage(currentProduct.path_image_2)}
            />
          </div>
          <img
            src={currentImage}
            alt="Image_Main"
            id="image_main"
            height={500}
            width={500}
          />
        </div>
        <div className="product_detail">
          <h3 className="name-product">{currentProduct.product_name}</h3>
          <p id="price">${currentProduct.price}</p>
          <div className="describe">{currentProduct.short_describe}</div>
          <div className="btn-order">
            <div className="quantity">
              <button id="decrease">-</button>
              <input
                type="number"
                min={1}
                max={999}
                defaultValue={1}
                step={1}
              />

              <button id="increase">+</button>
            </div>
            <button className="add-to-cart">ADD TO CART</button>
          </div>
          <div className="more-detail">
            <p>More detail:</p>
            <div id="infor_more">{currentProduct.more_details}</div>
          </div>
        </div>
      </div>

      <div className="may-like">
        <h3>You may also like</h3>
        <div className="product_list">
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
      </div>

      <div className="recent-view may-like">
        <h3>Recent viewed products</h3>
        <div className="product_list">
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
