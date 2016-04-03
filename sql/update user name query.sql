update new_schema.sample_users
set user_first_name = "Loretta"
where user_first_name = "Loretta1"
LIMIT 1;
-- 
-- UPDATE new_schema.sample_users
-- SET user_first_name = "Loretta"
-- WHERE user_first_name LIKE '%Loretta1%'
-- LIMIT 1;


SELECT * FROM new_schema.sample_users WHERE user_first_name LIKE '%Loretta%';