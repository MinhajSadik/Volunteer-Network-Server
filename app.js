const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  { MongoClient } = require("mongodb"),
  dotenv = require("dotenv").config(),
  PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: faslse }));
app.use(bodyParser.json());

// Connection URL
const DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pu4qt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
