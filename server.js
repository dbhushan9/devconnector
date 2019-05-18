const express = require("express");
const mongoose = require("mongoose");

const users = require("./router/users");
const profile = require("./router/profile");
const posts = require("./router/posts");

const app = express();

const PORT = process.env.port || 5000;

//DB Config
const db = require("./config/keys").mongoURI;

//connect to DB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("connected to mongodb"))
  .catch(err => console.log(err));

app.get("/", (req, res) => req.send("Hello"));

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

//Rotues
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
