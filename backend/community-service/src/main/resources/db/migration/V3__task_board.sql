CREATE TABLE IF NOT EXISTS TASK_POST (
    id IDENTITY PRIMARY KEY,
    circle_id BIGINT NOT NULL,
    author_user_id VARCHAR(255) NOT NULL,
    type VARCHAR(16) NOT NULL,
    title VARCHAR(255) NOT NULL,
    body CLOB,
    start_at TIMESTAMP,
    end_at TIMESTAMP,
    price_cents BIGINT,
    status VARCHAR(16) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_tp_circle FOREIGN KEY (circle_id) REFERENCES CIRCLE(id)
);

CREATE TABLE IF NOT EXISTS TASK_OFFER (
    id IDENTITY PRIMARY KEY,
    post_id BIGINT NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    message CLOB,
    price_cents BIGINT,
    status VARCHAR(16) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_to_post FOREIGN KEY (post_id) REFERENCES TASK_POST(id)
);

CREATE TABLE IF NOT EXISTS TASK_FEEDBACK (
    id IDENTITY PRIMARY KEY,
    post_id BIGINT NOT NULL,
    rater_user_id VARCHAR(255) NOT NULL,
    rating INT,
    comment CLOB,
    CONSTRAINT fk_tf_post FOREIGN KEY (post_id) REFERENCES TASK_POST(id)
);