CREATE TABLE IF NOT EXISTS INCIDENT (
    id IDENTITY PRIMARY KEY,
    circle_id BIGINT NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    type VARCHAR(32),
    description CLOB,
    severity INT,
    status VARCHAR(16) NOT NULL,
    media_path VARCHAR(512),
    created_at TIMESTAMP NOT NULL
);