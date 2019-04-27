const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  const db = req.app.get("db");
  const { username, email, password, admin } = req.body;
  const user = await db.login(username);
  if (user.length > 0) {
    res.status(403).json("username taken");
  } else {
    const hash = await bcrypt.hash(password, 10);
    await db.sign_up([username, email, hash, admin]);
    req.session.user = { username, email, admin };
    res.status(200).json(req.session.user);
  }
};

module.exports = {
  signup
};
