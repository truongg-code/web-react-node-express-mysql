const db = require("../../models/db.js");

const getItemNav = (req, res) => {
  const sql = "SELECT * FROM navigation";

  db.query(sql, (err, data) => {
    if (err) return res.json("ERROR");
    return res.json(data);
  });
};

const getChildItemNav = (req, res) => {
  //   const sql =
  //     "SELECT n.NavID, c.name AS child_name FROM navigation n LEFT JOIN child_navigation c ON n.NavID = c.NavID;";
  const sql = "SELECT * FROM child_navigation";
  db.query(sql, (err, data) => {
    if (err) return res.json("ERROR");
    return res.json(data);
  });
};

module.exports = {
  getItemNav,
  getChildItemNav,
};
