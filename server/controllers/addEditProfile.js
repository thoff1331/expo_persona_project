const addPortfolio = async (req, res) => {
  const db = req.app.get("db");
  const { expo_id } = req.session.user;
  const { img, title, artist, date, description } = req.body;

  const result = await db.portfolio([
    expo_id,
    img,
    title,
    artist,
    date,
    description
  ]);
  console.log(result);
  res.status(200).json(result);
};

const deleteWork = async (req, res) => {
  console.log(+req.params.id);
  const db = req.app.get("db");
  const result = await db.delete_works(req.params.id);

  //sequalstatement
  res.status(200).json(result);
};

const editPortfolio = (req, res) => {
  console.log(req.body);
  const { img, title, artist, date, description } = req.body;
  const db = req.app.get("db");
  db.portfolio_update([img, title, artist, date, description, 75])
    .then(info => res.status(200).json(info))
    .catch(err => console.log(err));
};

//double check
const displayWork = (req, res) => {
  const db = req.app.get("db");
  db.worksportfolio(req.session.user.expo_id).then(works =>
    res.status(200).json(works)
  );
};
const discover = (req, res) => {
  const db = req.app.get("db");
  db.all_works().then(works => res.status(200).json(works));
};

const creators = (req, res) => {
  const db = req.app.get("db");
  db.all_artists().then(creators => res.status(200).json(creators));
};

module.exports = {
  addPortfolio,
  displayWork,
  deleteWork,
  editPortfolio,
  discover,
  creators
};
