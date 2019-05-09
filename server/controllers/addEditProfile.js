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

//double check
const displayWork = (req, res) => {
  const db = req.app.get("db");
  db.worksportfolio(req.session.user.expo_id).then(works =>
    res.status(200).json(works)
  );
};

module.exports = {
  addPortfolio,
  displayWork
};
