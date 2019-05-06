UPDATE expo_users
SET img = $1,
name = $2,
bio = $3,
medium = $4
WHERE username = $5;
