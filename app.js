const express = require("express");
const app = express();

const routes = require("./routes/routes.js");

app.use(express.json()); // enables node to convert req.body on JSON,
app.use(express.urlencoded({ extended: true })); // same but with URL

app.use("/", routes);

module.exports = app;
