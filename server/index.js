require("dotenv").config();
const express = require("express");
const app = express();
const massive = require("massive");
const session = require("express-session");

app.use(express.json());
const {
  editPage,
  signup,
  login,
  infoSetup,
  pageSetup,
  displayInfo,
  logout,
  // displayPage,
  checkUser
} = require("./controllers/authController");

const {
  addPortfolio,
  displayWork,
  deleteWork,
  editPortfolio,
  discover,
  creators,
  addLikes
} = require("./controllers/addEditProfile");
// const { displayPage, checkUser } = require("./controllers/pageSetup"); //check//
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
app.get("/auth/creators", creators);
app.get("/auth/discover", discover);
app.post("/auth/signup", signup);
app.post("/auth/login", login);

//aboutPage and pageSetup

app.post("/auth/pagesetup", pageSetup);
// app.get("/auth/displayPage", displayPage);
app.get("/check/user", checkUser);
app.get("/auth/displayInfo", displayInfo);
app.get("/auth/logout", logout);
app.post("/auth/displayPage", editPage);
//portfolio
app.post("/api/portfolio", addPortfolio);
app.get("/api/portfolio", displayWork);
app.delete("/api/portfolio/:id", deleteWork);
app.put("/api/portfolio", editPortfolio);
app.get("/auth/addLike/:id", addLikes);

app.listen(SERVER_PORT, () => {
  console.log(`Listening on port ${SERVER_PORT}`);
});
