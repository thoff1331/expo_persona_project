INSERT INTO portfolio (title, artist, date, description)
VALUES ($1, $2, $3, $4)
RETURNING *;