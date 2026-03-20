-- 000004_add_current_unity_fk_to_users.up.sql
ALTER TABLE users
    ADD CONSTRAINT fk_users_current_unity
    FOREIGN KEY (current_unity_id) REFERENCES unities(id) ON DELETE SET NULL;