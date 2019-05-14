update portfolio 

set likes = likes + 1 where portfolio_id = $1;
select * from portfolio order by portfolio_id desc;