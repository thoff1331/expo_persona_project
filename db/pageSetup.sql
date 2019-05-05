INSERT INTO account (img, name, bio, medium, expo_id) 
VALUES ($1, $2, $3, $4, $5)
RETURNING *;