INSERT INTO expo_users (username, email, password, admin) VALUES ($1,$2,$3,$4)
RETURNING *;