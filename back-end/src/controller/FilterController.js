const db = require("../models/db.js");

const filterProductByPrice = (req, res) => {
  const sql =
    "SELECT * FROM `shop_all_products` WHERE `price` > ? and `price` < ?;";
  const values = [req.query.minValue, req.query.maxValue];
  console.log(req.query);
  db.query(sql, values, (err, data) => {
    if (err) return res.json("ERROR");
    return res.json(data);
  });
};

module.exports = {
  filterProductByPrice,
};
