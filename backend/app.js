const express = require("express");
const app = express();
const bodyParser = require("body-parser");

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
  const post = req.body;
  res.status(201).json({ message: "Post added successfully" });
});

app.get("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "daushiashia",
      title: "Mango",
      content: "Yellow and red",
    },
    {
      id: "eiu21rhi1ru",
      title: "Avocado",
      content: "Green",
    },
  ];
  res.status(200).send({
    message: "OK",
    posts: posts,
  });
});

module.exports = app;

/* app.get("/", function (req, res) {
  res.send("Server working!");
}); */

/* app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port}`);
}); */
