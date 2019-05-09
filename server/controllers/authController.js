const bcrypt = require("bcryptjs");
let count = 0;

const signup = async (req, res) => {
  const db = req.app.get("db");

  const { username, email, password } = req.body;
  const user = await db.check_for_user(username);
  // should this be expod_id?
  if (user[0]) {
    return res.status(400).json("Username already exists");
  }
  const hash = await bcrypt.hash(password, 10);
  const result = await db.sign_up([username, email, hash]).catch(err => {
    console.log(err);
  });
  req.session.user = {
    username: result[0].username,
    expo_id: result[0].expo_id
  };
  res.json(result[0]);
};
const login = async (req, res) => {
  const db = req.app.get("db");

  const results = await db.login(req.body.username);
  if (results[0]) {
    // check the password
    const isMatch = await bcrypt.compare(
      req.body.password,
      results[0].password
    );
    if (isMatch) {
      req.session.user = {
        username: results[0].username,
        expo_id: results[0].expo_id
      };
      console.log(results);
      res.json(req.session.user);
    } else {
      res.status(403).json("Error: Wrong password");
    }
  } else {
    res.status(403).json("Error: Wrong username.");
  }
};
const infoSetup = async (req, res) => {
  // console.log("ID: ", req.session.user.expo_id);
  const db = req.app.get("db");
  // console.log(req.body.img);
  const { img, name, bio, medium } = req.body;
  const result = await db
    .pageSetup([img, name, bio, medium, req.session.user.expo_id])
    .catch(err => {
      console.log(err);
      res.status(400).json("No Accessing Data");
    });
  res.status(200).json(result);
};

const checkUser = async (req, res) => {
  const db = req.app.get("db");
  // console.log("hit");
  //expo id on session for sql statement
  // console.log(req.session);
  let user = req.session.user;
  if (!user) {
    user = { img: "", name: "", bio: "", medium: "" };
    //Write a SQL Query that gets all the info you need and takes in user

    //Send that data back to the front end
    res.json(user);
  } else {
    // console.log(user);
    let result = await db.getUserInfo(user.expo_id);
    // console.log(result);
    res.status(200).json(result[0]);
  }
};
const pageSetup = async (req, res) => {
  count++;
  //console.log("COUNT ****: ", count);
  const db = req.app.get("db");
  const { img, name, bio, medium } = req.body;
  //console.log("Req.body: ", req.body);
  const result = await db
    .pageSetup([img, name, bio, medium, req.session.user.username])
    .catch(err => {
      console.log(err);
      res.status(400).json("No Accessing Data");
    });
  res.status(200).json(result);
};

const displayInfo = (req, res) => {
  console.log(+req.session.user.expo_id);
  const db = req.app.get("db");
  db.display_info(+req.session.user.expo_id).then(info =>
    res.status(200).json(info)
  );
};
const logout = (req, res) => {
  console.log("logged out");
  req.session.destroy();
  res.sendStatus(200).json("hey");
};

//edit info function
const editPage = (req, res) => {
  console.log(req.session.user.username);
  const { img, name, bio, medium } = req.body;
  const db = req.app.get("db");
  db.update_info([img, name, bio, medium, +req.session.user.expo_id])
    .then(info => res.status(200).json(info))
    .catch(err => console.log(err));
};
// const displayPage = (req, res) => {
//   console.log("hit");
//   const db = req.app.get("db");
//   db.display_page().then(info => res.status(200).json(info));
// };

module.exports = {
  signup,
  login,
  // displayPage,
  infoSetup,
  checkUser,
  pageSetup,
  displayInfo,
  logout,
  editPage
};
