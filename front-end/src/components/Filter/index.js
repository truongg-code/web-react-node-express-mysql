import React, { useEffect } from "react";
import "./filter.scss";
import { useState } from "react";
import { fetchProductsFilterByPrice } from "../../services/Service";
import { useLocation, useNavigate } from "react-router-dom";

const Filter = ({ show, handleClose, handleFilterFromModal }) => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(200);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(">> check key-value changed ", location.search);
    fetchDataBasedOnUrlParams();
  }, [location.search]);

  const fetchDataBasedOnUrlParams = () => {
    const searchParams = new URLSearchParams(location.search);
    const minVal = searchParams.get("minValue");
    const maxVal = searchParams.get("maxValue");

    // Xử lý các giá trị và gọi hàm cần thiết
    fetchData(minVal, maxVal);
  };

  const fetchData = async (minValue, maxValue) => {
    // Gọi API hoặc thực hiện các hành động cần thiết để lấy dữ liệu mới
    const res = await fetchProductsFilterByPrice(minValue, maxValue);

    // Xử lý dữ liệu mới, có thể cập nhật state hoặc làm bất cứ điều gì khác
    if (res) {
      handleFilterFromModal(res);
    }
  };

  const handleFilter = async () => {
    // const res = await fetchProductsFilterByPrice(minValue, maxValue);
    // if (res) {
    //   handleFilterFromModal(res);
    // }
    handleClose();

    const searchParams = new URLSearchParams(location.search);
    searchParams.set("minValue", minValue);
    searchParams.set("maxValue", maxValue);

    navigate(`${location.pathname}?${searchParams.toString()}`);
  };
  return (
    <>
      <div className={`filter-container ${show === true ? "active" : ""}`}>
        <div className="filter-place">
          <div className="filter-header">
            <h3>FILTER</h3>
            <div className="icon-x">
              <i
                className="fa-solid fa-xmark"
                onClick={() => handleClose()}
              ></i>
            </div>
          </div>
          <div className="filter-options">
            <h6 className="name-option">Price</h6>
            <div className="price-filter-form">
              <div className="price-value-filter">
                <div className="min-container">
                  From: &nbsp;
                  <input
                    type="number"
                    id="value-filter"
                    value={minValue}
                    onChange={(e) => setMinValue(e.target.value)}
                  />
                </div>
                <div className="max-container">
                  To:&nbsp;
                  <input
                    type="number"
                    id="value-filter"
                    value={maxValue}
                    onChange={(e) => setMaxValue(e.target.value)}
                  />
                </div>
              </div>
              <div className="btn btn-success" onClick={() => handleFilter()}>
                Filter
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
