-- 000004_add_current_unity_fk_to_users.down.sql
ALTER TABLE users DROP CONSTRAINT IF EXISTS fk_users_current_unity;