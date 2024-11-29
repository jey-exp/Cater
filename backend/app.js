const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./Router/Router");
const stripe = require("stripe")("your_stripe_secret_key");
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use("/api/v1", router);

const port = 3000;
app.listen(port, () => {
  console.log("Server is running on port", port);
});
