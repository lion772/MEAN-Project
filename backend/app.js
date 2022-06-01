const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");
const Post = require("./models/post");
const TOKEN = process.env.MONGODB_PASSWORD;
console.log(TOKEN);

mongoose
  .connect(
    `mongodb+srv://Will:${TOKEN}@cluster0.xe1fe.mongodb.net/node-angular?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save();
  console.log(`Posts here: ${post}`);
  res.status(201).json({ message: "Post added successfully" });
});

app.get("/api/posts", (req, res, next) => {
  Post.find()
    .then((result) => {
      console.log(result);
      res.status(200).send({
        message: "OK",
        posts: result,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = app;

/* const uri = `mongodb+srv://Will:${TOKEN}@cluster0.xe1fe.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("node-angular").collection("devices");
  // perform actions on the collection object
  client.close();
}); */
