CREATE TABLE kafka_messages (
    id          SERIAL PRIMARY KEY,
    topic       VARCHAR(255) NOT NULL,
    partition   INTEGER NOT NULL,
    "offset"    BIGINT NOT NULL,
    key         VARCHAR(255),
    payload     JSONB,
    received_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);