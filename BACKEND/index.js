require("dotenv").config(); //for env files
const express = require("express");

const app = express();

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
var useragent = require("express-useragent");

const work=require("./routes/addWorks")

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "150mb",
  })
);

app.use(bodyParser.json({ limit: "150mb" }));

app.use(express.json());

//for getting images to frontend
app.use("/uploads", express.static("uploads"));


//cors setup
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//SECURITY SETUP
app.use(cors());
app.use(helmet({ crossOriginResourcePolicy: false }));

//CONSOLES THE USER INFORMATION AND API CALLS INTO THE SERVER ENVIRONMENT
app.use(useragent.express());
app.use((req, res, next) => {
  var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  console.log(fullUrl);
  next();
});

mongoose
  .connect(process.env.MONGO_URI_PORTFOLIO)
  .then(() => {
    console.log("DATABASE CONNECTED SUCCESSFULLY");
  })
  .catch((err) => {
    console.log("Error connecting to database");
    console.log(err);
  });

app.use(work)

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
