import axios from "./customize-axios";

const fetchNavBar = () => {
  return axios.get("/api/navigation");
};

const fetchChildItemNavBar = () => {
  return axios.get("/api/child-item-navigation");
};

const fetchShopAllProducts = () => {
  return axios.get("/api/collections/shop-all");
};

const fetchProductsArrange = (sort_by) => {
  return axios.get(`/api/collections/shop-all/sort_by=${sort_by}`);
};

const fetchProductDetail = (slug) => {
  return axios.get(`/api/collections/shop-all/products/${slug}`);
};

const fetchProductsFilterByPrice = (minValue, maxValue) => {
  // return axios.get(`/api/collections/shop-all/filter=price`);
  return axios.get(
    `/api/collections/shop-all/filter=price?minValue=${minValue}&maxValue=${maxValue}`
  );
  // http://localhost:3001/products?minPrice=${minPrice}&maxPrice=${maxPrice}
};

const fetchProductsSearchInput = (query) => {
  return axios.get(`/api/collections/shop-all/search/?q=${query}`);
};

const countOrderCodeDuplicated = (orderCode) => {
  return axios.get(`/customer/check-duplicated?order_code=${orderCode}`);
};

const getCheckBankingCustomer = (orderCode) => {
  return axios.get(`/customer/check-banking?order_code=${orderCode}`);
};
export {
  fetchNavBar,
  fetchChildItemNavBar,
  fetchShopAllProducts,
  fetchProductsArrange,
  fetchProductDetail,
  fetchProductsFilterByPrice,
  fetchProductsSearchInput,
  countOrderCodeDuplicated,
  getCheckBankingCustomer,
};
