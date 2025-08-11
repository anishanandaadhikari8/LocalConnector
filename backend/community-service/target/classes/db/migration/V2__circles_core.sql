CREATE TABLE IF NOT EXISTS CIRCLE (
    id IDENTITY PRIMARY KEY,
    owner_user_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(64) NOT NULL,
    center_lat DOUBLE,
    center_lng DOUBLE,
    radius_miles DOUBLE,
    branding_json CLOB,
    policies_json CLOB,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS CIRCLE_FEATURE (
    id IDENTITY PRIMARY KEY,
    circle_id BIGINT NOT NULL,
    feature_key VARCHAR(128) NOT NULL,
    enabled BOOLEAN NOT NULL,
    CONSTRAINT fk_cf_circle FOREIGN KEY (circle_id) REFERENCES CIRCLE(id)
);

CREATE TABLE IF NOT EXISTS CIRCLE_HIERARCHY (
    id IDENTITY PRIMARY KEY,
    parent_id BIGINT NOT NULL,
    child_id BIGINT NOT NULL,
    CONSTRAINT fk_ch_parent FOREIGN KEY (parent_id) REFERENCES CIRCLE(id),
    CONSTRAINT fk_ch_child FOREIGN KEY (child_id) REFERENCES CIRCLE(id)
);

CREATE TABLE IF NOT EXISTS CIRCLE_EDGE (
    id IDENTITY PRIMARY KEY,
    from_circle_id BIGINT NOT NULL,
    to_circle_id BIGINT NOT NULL,
    allowed_actions_json CLOB,
    status VARCHAR(16) NOT NULL,
    CONSTRAINT fk_ce_from FOREIGN KEY (from_circle_id) REFERENCES CIRCLE(id),
    CONSTRAINT fk_ce_to FOREIGN KEY (to_circle_id) REFERENCES CIRCLE(id)
);

CREATE TABLE IF NOT EXISTS MEMBERSHIP (
    id IDENTITY PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    circle_id BIGINT NOT NULL,
    role VARCHAR(64) NOT NULL,
    verified BOOLEAN NOT NULL,
    unit VARCHAR(64),
    created_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_mem_circle FOREIGN KEY (circle_id) REFERENCES CIRCLE(id)
);