const express = require("express");
// const navRoute = require("./routes/navigation.js");
const cors = require("cors");
const mysql = require("mysql");
const { default: initApiRoutes } = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(cors());

//init API route
initApiRoutes(app);

app.listen(PORT, () => {
  console.log("Server listening on port 8081");
});
