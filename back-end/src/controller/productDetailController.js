const db = require("../models/db.js");

const getProductDetail = (req, res) => {
  const slug = req.params.slug;
  const sql = "SELECT * FROM shop_all_products WHERE slug = ?";
  db.query(sql, [slug], (err, data) => {
    if (err) return res.json("ERROR");
    return res.json(data);
  });
};

module.exports = {
  getProductDetail,
};
