-- 000005_create_members.up.sql
CREATE TABLE members (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    unity_id   UUID NOT NULL REFERENCES unities(id) ON DELETE CASCADE,
    role       VARCHAR(50) NOT NULL DEFAULT 'member',
    joined_at  TIMESTAMP NOT NULL DEFAULT now(),
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),
    UNIQUE(user_id, unity_id)
);

CREATE INDEX idx_members_user_id ON members(user_id);
CREATE INDEX idx_members_unity_id ON members(unity_id);