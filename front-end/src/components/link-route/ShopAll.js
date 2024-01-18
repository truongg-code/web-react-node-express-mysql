import React, { useEffect, useState } from "react";
import ScrollingNav from "../ScrollingNav";
import { useLocation, useNavigate } from "react-router-dom";

import "../../styles/collections/collections.scss";
import Product from "../Product";
import Filter from "../Filter";

import {
  fetchProductsArrange,
  fetchShopAllProducts,
} from "../../services/Service";

import { useShoppingContext } from "../../contexts/ShoppingContext";

const ShopAll = () => {
  const [gridCurrent, setGridCurrent] = useState(2);
  const [productList, setProductList] = useState([]);
  const [isShowSortBy, setIsShowSortBy] = useState(false);
  const [isShowModalFilter, setIsShowModalFilter] = useState(false);

  const [sortBy, setSortBy] = useState("manual");
  const [sortByActive, setSortByActive] = useState("Sort");

  const location = useLocation();
  const navigate = useNavigate();

  const { addCartItem } = useShoppingContext();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const res = await fetchShopAllProducts();
    if (res) {
      setProductList(res);
    }
  };

  const handleArrange = async (sort_by) => {
    setSortBy(sort_by);
    const res = await fetchProductsArrange(sort_by);
    if (res) {
      setProductList(res);
    }
  };

  const handleClickFilter = () => {
    setIsShowModalFilter(true);
  };

  const handleClose = () => {
    setIsShowModalFilter(false);
  };

  const handleFilterFromModal = (listNew) => {
    setProductList(listNew);
  };

  return (
    <>
      {/* <ScrollingNav /> */}
      <div className="name-collection">
        <Filter
          show={isShowModalFilter}
          handleClose={handleClose}
          handleFilterFromModal={handleFilterFromModal}
        />
        <h5>Shop All</h5>
      </div>
      <div className="func-option-container col-lg-10 col-12">
        <div className="filter" onClick={() => handleClickFilter()}>
          <i className="fa-solid fa-filter"></i>&nbsp; Filter
        </div>
        <div className="grid-container">
          <div
            className={`grid-list grid-1 ${gridCurrent === 1 ? "active" : ""}`}
            onClick={() => setGridCurrent(1)}
          >
            <i className="fa-solid fa-square"></i>
          </div>
          <div
            className={`grid-list grid-2 ${gridCurrent === 2 ? "active" : ""}`}
            onClick={() => setGridCurrent(2)}
          >
            <i className="fa-solid fa-square"></i>
            <i className="fa-solid fa-square"></i>
          </div>
          <div
            className={`grid-list grid-3 ${gridCurrent === 3 ? "active" : ""}`}
            onClick={() => setGridCurrent(3)}
          >
            <i className="fa-solid fa-square"></i>
            <i className="fa-solid fa-square"></i>
            <i className="fa-solid fa-square"></i>
          </div>
          <div
            className={`grid-list grid-4 ${gridCurrent === 4 ? "active" : ""}`}
            onClick={() => setGridCurrent(4)}
          >
            <i className="fa-solid fa-square"></i>
            <i className="fa-solid fa-square"></i>
            <i className="fa-solid fa-square"></i>
            <i className="fa-solid fa-square"></i>
          </div>
        </div>
        <div
          className="sort_by col-2"
          onClick={() => setIsShowSortBy(!isShowSortBy)}
        >
          <span>{sortByActive}</span>

          <i
            className={
              isShowSortBy === true
                ? "fa-solid fa-chevron-up"
                : "fa-solid fa-chevron-down"
            }
          ></i>
          <div
            className={`sort_by_option-container ${
              isShowSortBy === true ? "active" : ""
            }`}
          >
            <div
              className={`sort_by_option ${
                sortByActive === "Featured" ? "active" : ""
              }`}
              onClick={() => {
                setSortByActive("Featured");
                getProducts();
              }}
            >
              Featured
            </div>
            <div
              className={`sort_by_option ${
                sortByActive === "ALB: A-Z" ? "active" : ""
              }`}
              onClick={() => {
                setSortByActive("ALB: A-Z");
                handleArrange("asc");
              }}
            >
              Alphabetically, A-Z
            </div>
            <div
              className={`sort_by_option ${
                sortByActive === "ALB: Z-A" ? "active" : ""
              }`}
              onClick={() => {
                setSortByActive("ALB: Z-A");
                handleArrange("desc");
              }}
            >
              Alphabetically, Z-A
            </div>
          </div>
        </div>
      </div>
      <div
        className={`product-list col-lg-10 col-sm-12 grid-${gridCurrent}-active`}
      >
        {productList &&
          productList.length > 0 &&
          productList.map((item) => (
            <Product
              key={`product-${item.ID}`}
              id={item.ID}
              product_name={item.product_name}
              price={item.price}
              short_describe={item.short_describe}
              path_image={item.path_image}
              slug={item.slug}
              addCartItem={() => addCartItem(item)}
            />
          ))}
      </div>
      <p className="section-title">Our Customers Reviews</p>
    </>
  );
};

export default ShopAll;
