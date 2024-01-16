import React from "react";
import "../styles/product.scss";
import { NavLink } from "react-router-dom";

const Product = ({
  ID,
  product_name,
  price,
  short_describe,
  path_image,
  slug,
  addCartItem,
}) => {
  return (
    <div className="product_information" key={`product-${ID}`}>
      <div className="image-container">
        <NavLink to={`/collections/shop-all/products/${slug}`}>
          <img src={path_image} alt="Product_Image" />
        </NavLink>

        <div className="btn_quick">
          <NavLink to={`/collections/shop-all/products/${slug}`}>
            <button className="quick_view">
              <p>Quick view</p>
              <i className="fa-regular fa-eye"></i>
            </button>
          </NavLink>
          <button className="quick_shop" onClick={addCartItem}>
            <p>Add to cart</p>
            <i className="fa-solid fa-cart-plus"></i>
          </button>
        </div>
      </div>
      <div className="intro_production">
        <h6 className="product_name">{product_name}</h6>
        <p className="price">${price}</p>

        <p className="intro_describe">{short_describe}</p>
      </div>
    </div>
  );
};

export default Product;
