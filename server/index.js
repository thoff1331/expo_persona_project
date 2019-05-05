require("dotenv").config();
const express = require("express");
const app = express();
const massive = require("massive");
const session = require("express-session");

app.use(express.json());
const { signup, login } = require("./controllers/authController");

const {
  pageSetup,
  displayPage,
  checkUser
} = require("./controllers/pageSetup"); //check//
const { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT } = process.env;

massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    console.log("Database Connected");
  })
  .catch(err => {
    console.log(err);
  });
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);

app.post("/auth/signup", signup);
app.post("/auth/login", login);

//aboutPage and pageSetup

app.post("/auth/pageSetup", pageSetup);
app.get("/auth/displayPage", displayPage);
app.get("/check/user", checkUser);

//portfolio setup
// app.post('/auth/')

app.listen(SERVER_PORT, () => {
  console.log(`Listening on port ${SERVER_PORT}`);
});
