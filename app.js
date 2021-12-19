const express = require("express"),
  bodyParser = require("body-parser"),
  MongoClient = require("mongodb").MongoClient,
  dotenv = require("dotenv").config(),
  cors = require("cors"),
  PORT = process.env.PORT || 3001,
  app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Connection URL
// Create a new MongoClient
const DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pu4qt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
const client = new MongoClient(DB_URL, options);
// console.log(DB_URL);
client.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Database connected...");
  }
  const volunteerCollection = client
    .db("volunteerNetwork")
    .collection("volunteers");

  // Routes
  app.get("/", (req, res) => {
    res.send("Volunteer Network API");
  });
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on ${PORT}`);
});
