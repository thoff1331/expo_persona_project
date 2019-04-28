INSERT INTO expo_users (username, email, password) VALUES ($1,$2,$3)
RETURNING *;