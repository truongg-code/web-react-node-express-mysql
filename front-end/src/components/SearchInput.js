import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "../styles/searchinput.scss";
import { fetchProductsSearchInput } from "../services/Service";
import CartItem from "../components/CartItem";

const SearchInput = () => {
  const [query, setQuery] = useState("");
  const [dataSearch, setDataSearch] = useState([]);

  const [isShowModalDataSearch, setIsShowModalDataSearch] = useState(false);

  useEffect(() => {
    if (query.length > 1) {
      setIsShowModalDataSearch(true);
      const res = fetchProductsSearchInput(query);
      res.then(function (result) {
        if (result) setDataSearch(result);
        console.log(">> check dataSearch:", dataSearch);
      });
    } else if (query.length === 0) {
      setIsShowModalDataSearch(false);
    }
  }, [query]);
  return (
    <>
      <div className="header-form px-3 py-1 d-lg-flex d-none">
        <select className="option-cate">
          <option>All Categories</option>
        </select>
        <Form className="d-flex search-space">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </Form>
      </div>
      <div
        className={`products-search-container col-3 ${
          isShowModalDataSearch === true ? "active" : ""
        }`}
      >
        <div className="product-search-list overflow-auto">
          {dataSearch &&
            dataSearch.map((item) => (
              <div className="cart-item-container h-25">
                <img
                  src={item.path_image}
                  alt="product"
                  width={80}
                  height={80}
                />
                <div className="short-infor">
                  <a
                    className="name-item"
                    href={`/collections/shop-all/products/${item.slug}`}
                  >
                    {item.product_name}
                  </a>
                  <p className="price">${item.price}</p>
                </div>
              </div>
            ))}
        </div>
        <div className="search-page-btn">
          <a href="#">Search for {query}</a>&nbsp;
          <i className="fa-solid fa-arrow-right"></i>
        </div>
      </div>
    </>
  );
};

export default SearchInput;
