import React from "react";
import "./cartitem.scss";
import { useShoppingContext } from "../../contexts/ShoppingContext";

const CartItem = ({
  ID,
  product_name,
  price,
  short_describe,
  path_image,
  slug,
  qty,
}) => {
  const { increaseQty, decreaseQty, removeCartItem } = useShoppingContext();
  return (
    <div className="cart-item-container">
      <img src={path_image} alt="product" width={150} height={150} />
      <div className="short-infor">
        <a
          className="name-item"
          href={`/collections/shop-all/products/${slug}`}
        >
          {product_name}
        </a>
        <p className="price">${price}</p>
        <div className="quantity">
          <button id="decrease" onClick={() => decreaseQty(ID)}>
            -
          </button>
          <input
            type="number"
            min={1}
            max={999}
            // defaultValue={1}
            // step={1}
            value={qty}
            readOnly
          />

          <button id="increase" onClick={() => increaseQty(ID)}>
            +
          </button>
        </div>
        <button className="btn-remove" onClick={() => removeCartItem(ID)}>
          <i className="fa-regular fa-trash-can"></i>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
