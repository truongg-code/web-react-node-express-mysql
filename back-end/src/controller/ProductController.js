const db = require("../models/db.js");

//shop-all
const getShopAllProduct = (req, res) => {
  const sql = "SELECT * FROM shop_all_products";
  db.query(sql, (err, data) => {
    if (err) return res.json("ERROR");
    return res.json(data);
  });
};

// sort product from a - z
const arrangeShopAllProductsAtoZ = (req, res) => {
  const sql = "SELECT * FROM shop_all_products ORDER BY product_name ASC";
  db.query(sql, (err, data) => {
    if (err) return res.json("ERROR");
    return res.json(data);
  });
};

//sort product from z - a
const arrangeShopAllProductsZtoA = (req, res) => {
  const sql = "SELECT * FROM shop_all_products ORDER BY product_name DESC";
  db.query(sql, (err, data) => {
    if (err) return res.json("ERROR");
    return res.json(data);
  });
};

//wedding
const getWeddingProduct = (req, res) => {
  const sql = "SELECT * FROM wedding_products";
  db.query(sql, (err, data) => {
    if (err) return res.json("ERROR");
    return res.json(data);
  });
};

// sort product from a - z
const arrangeWeddingProductsAtoZ = (req, res) => {
  const sql = "SELECT * FROM shop_all_products ORDER BY product_name ASC";
  db.query(sql, (err, data) => {
    if (err) return res.json("ERROR");
    return res.json(data);
  });
};

//sort product from z - a
const arrangeWeddingProductsZtoA = (req, res) => {
  const sql = "SELECT * FROM shop_all_products ORDER BY product_name DESC";
  db.query(sql, (err, data) => {
    if (err) return res.json("ERROR");
    return res.json(data);
  });
};

module.exports = {
  getShopAllProduct,
  arrangeShopAllProductsAtoZ,
  arrangeShopAllProductsZtoA,
  getWeddingProduct,
  arrangeWeddingProductsAtoZ,
  arrangeWeddingProductsZtoA,
};
