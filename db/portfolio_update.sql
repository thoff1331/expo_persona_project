-- UPDATE portfolio
-- SET img = $1,
-- title = $2,
-- artist = $3,
-- date = $4,
-- description = $5
-- WHERE portfolio_id = $6
UPDATE portfolio SET img =$1 where expo_id =$6;
UPDATE portfolio SET title =$2 where expo_id =$6;
UPDATE portfolio SET artist =$3 where expo_id =$6;
UPDATE portfolio SET date =$4 where expo_id =$6;
UPDATE portfolio SET description=$5 where expo_id =$6;

SELECT * portfolio WHERE expo_id = $6;