const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const users = require("./router/api/users");
const profile = require("./router/api/profile");
const posts = require("./router/api/posts");

const PORT = process.env.port || 5000;

const app = express();

//BodyParser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//DB Config
const db = require("./config/keys").mongoURI;

//connect to DB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("connected to mongodb"))
  .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport Config
require("./config/passport")(passport);

//Rotues
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

app.get("/", (req, res) => req.send("Hello"));

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
