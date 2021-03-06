const express = require("express"),
  bodyParser = require("body-parser"),
  MongoClient = require("mongodb").MongoClient,
  ObjectID = require("mongodb").ObjectID,
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
});

const eventsCollection = client.db("volunteers").collection("events");

// Routes
app.get("/", (req, res) => {
  res.send("Volunteer Network API");
});

app.post("/addEvent", (req, res) => {
  const newEvent = req.body;
  eventsCollection.insertOne(newEvent, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.status(200).send(result);
      console.log("result", result.insertedId);
    }
  });
});

app.get("/events", (req, res) => {
  eventsCollection.find({}).toArray((err, event) => {
    if (err) {
      console.error(err);
    } else {
      res.status(200).send(event);
      console.log("event:", event);
    }
  });
});

app.delete("/deleteEvent/:id", (req, res) => {
  const id = ObjectID(req.params.id);
  eventsCollection.findOneAndDelete({ _id: id }, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.status(200).send(result);
      console.log("deleted event:", result);
    }
  });
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on ${PORT}`);
});
