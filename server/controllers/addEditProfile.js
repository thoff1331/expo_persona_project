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

  res.status(200).json(result);
};

module.exports = {
  addPortfolio
};
