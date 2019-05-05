const pageSetup = async (req, res) => {
  console.log("ID: ", req.session.user.expo_id);
  const db = req.app.get("db");
  console.log(req.body.img);
  const { img, name, bio, medium } = req.body;
  const result = await db
    .pageSetup([img, name, bio, medium, req.session.user.expo_id])
    .catch(err => {
      console.log(err);
      res.status(400).json("No Accessing Data");
    });
  res.status(200).json(result);
};
//end

const displayPage = (req, res) => {
  console.log("hit");
  const db = req.app.get("db");
  db.display_page().then(info => res.status(200).json(info));
};

const checkUser = async (req, res) => {
  const db = req.app.get("db");
  console.log("hit");
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
    console.log(result);
    res.status(200).json(result[0]);
  }
};

module.exports = {
  pageSetup,
  displayPage,
  checkUser
};
