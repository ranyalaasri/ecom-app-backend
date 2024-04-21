require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes");
const cors = require("cors");
const config = require("./config/keys");
const http = require("http");
const server = http.createServer(app);

const { connection } = require("./utils/database");
const database = connection();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOptions = {
  origin: config.app.origin_front, // replace with the actual origin of your frontend
  credentials: true,
};

app.use(cors(corsOptions));
app.use(routes);

database.connectToMongo();

app.listen(config.port, () => {
  console.log(`\x1b[33m Server is running on port ${config.port} \x1b[0m`);
});
