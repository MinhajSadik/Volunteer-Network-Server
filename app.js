const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  { MongoClient } = require("mongodb"),
  dotenv = require("dotenv").config(),
  PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connection URL
// Create a new MongoClient
const options = { useNewUrlParser: true, useUnifiedTopology: true };
const DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pu4qt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(DB_URL, options);
client.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Database connected...");
  }
});

const volunteerCollection = client
  .db("volunteerNetwork")
  .collection("volunteer");

// Routes
app.get("/", (req, res) => {
  res.send("Volunteer Network API");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
