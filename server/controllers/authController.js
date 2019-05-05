const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  const db = req.app.get("db");
  console.log(req.body);
  const { username, email, password } = req.body;
  const user = await db.check_for_user(username);
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
  res.json(result);
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
      res.json({ username: results[0].username });
    } else {
      res.status(403).json("Error: Wrong password");
    }
  } else {
    res.status(403).json("Error: Wrong username.");
  }
};

module.exports = {
  signup,
  login
};
