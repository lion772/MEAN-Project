const express = require("express");
const app = express();
const port = 3000;

app.use("/api/posts", (req, res, next) => {
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
