const db = require("../../models/db.js");

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

const filterProducts = (req, res) => {
  if (req.query.sortBy !== undefined) {
    if (req.query.minValue && req.query.maxValue) {
      const sql =
        "SELECT * FROM `shop_all_products` WHERE `price` > ? and `price` < ? ORDER BY ?;";
      console.log(req.query);
      const values = [req.query.minValue, req.query.maxValue, req.query.sortBy];
      db.query(sql, values, (err, data) => {
        if (err) return res.json("ERROR");
        return res.json(data);
      });
    } else {
      const sql = "SELECT * FROM `shop_all_products` ORDER BY ?;";
      const values = [req.query.sortBy];
      console.log(req.query);
      db.query(sql, values, (err, data) => {
        if (err) return res.json("ERROR");
        return res.json(data);
      });
    }
  } else {
  }
};

module.exports = {
  filterProductByPrice,
};
