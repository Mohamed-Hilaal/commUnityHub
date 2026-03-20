-- 000007_create_conversations.up.sql
CREATE TABLE conversations (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type       VARCHAR(50) NOT NULL, -- 'unity_group', 'unity_private', 'direct'
    unity_id   UUID REFERENCES unities(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE INDEX idx_conversations_unity_id ON conversations(unity_id);
CREATE INDEX idx_conversations_type ON conversations(type);