require("dotenv").config();
const express = require("express");
const app = express();
const massive = require("massive");
const session = require("express-session");
const AWS = require("aws-sdk");
const fs = require("fs");
const fileType = require("file-type");
const bluebird = require("bluebird");
const multiparty = require("multiparty");

AWS.config.update({
  // region: "us-east-2",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3bucket = process.env.S3_BUCKET;
// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

const { addContactForm } = require("./controllers/contactForm");

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
// Contact Form
app.post("/api/contact", addContactForm);

const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: "public-read",
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  return s3.upload(params).promise();
};
app.post("/auth/picture", (request, response) => {
  console.log("hitt");
  const form = new multiparty.Form();
  form.parse(request, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = fileType(buffer);
      const timestamp = Date.now().toString();
      const fileName = `bucketFolder/${timestamp}-lg`;
      const data = await uploadFile(buffer, fileName, type);
      console.log(`data ${data}`);
      return response.status(200).send(data);
    } catch (error) {
      return response.status(400).send(error);
    }
  });
});
const configureRoutes = require("./routes");
configureRoutes(app);

app.listen(SERVER_PORT, () => {
  console.log(`Listening on port ${SERVER_PORT}`);
});
