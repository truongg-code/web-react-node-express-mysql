const db = require("../../models/db.js");

const getProductsSearch = (req, res) => {
  const sql = "SELECT * FROM shop_all_products";
  db.query(sql, (err, data) => {
    if (err) return res.json("ERROR");
    const q = req.query.q;
    const key = "product_name";
    const search = (data) => {
      return data.filter((item) => item[key].toLowerCase().includes(q));
    };
    return res.json(search(data));
  });
};

module.exports = { getProductsSearch };
