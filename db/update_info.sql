UPDATE expo_users SET img = $1 where expo_id = $5;
UPDATE expo_users SET name = $2 where expo_id = $5;
UPDATE expo_users SET bio = $3 where expo_id = $5;
UPDATE expo_users SET medium = $4 where expo_id = $5;

SELECT * FROM expo_users WHERE expo_id = $5;

-- edit sql