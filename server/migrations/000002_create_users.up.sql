-- 000002_create_users.up.sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email            VARCHAR(255) UNIQUE,
    username         VARCHAR(255) NOT NULL,
    full_name        VARCHAR(255),
    profile_picture  VARCHAR(255),
    google_id        VARCHAR(255) NOT NULL UNIQUE,
    password_hash    VARCHAR(255),
    account_id       UUID NOT NULL REFERENCES accounts(id),
    current_unity_id UUID,
    created_at       TIMESTAMP NOT NULL DEFAULT now(),
    updated_at       TIMESTAMP NOT NULL DEFAULT now()
);