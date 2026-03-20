-- 000003_create_unities.up.sql
CREATE TABLE unities (
    id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    community_name        VARCHAR(255) NOT NULL,
    location              VARCHAR(255),
    category              VARCHAR(255) NOT NULL,
    audience              VARCHAR(255) NOT NULL,
    community_description TEXT NOT NULL,
    contact_method        VARCHAR(255) NOT NULL,
    community_vision      TEXT NOT NULL,
    goals                 TEXT NOT NULL,
    long_term_objectives  TEXT NOT NULL,
    current_interest      BOOLEAN,
    content_and_activities TEXT,
    commitment_level      VARCHAR(255) NOT NULL,
    differentiation       TEXT,
    potential_challenges  TEXT,
    creator_id            UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
    created_at            TIMESTAMP NOT NULL DEFAULT now(),
    updated_at            TIMESTAMP NOT NULL DEFAULT now()
);