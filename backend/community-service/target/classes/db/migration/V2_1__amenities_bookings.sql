CREATE TABLE IF NOT EXISTS AMENITY (
    id IDENTITY PRIMARY KEY,
    circle_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    hours VARCHAR(255),
    capacity INT,
    approval_required BOOLEAN,
    slot_length_mins INT,
    max_per_week INT,
    cancellation_window_hours INT
);

CREATE TABLE IF NOT EXISTS BOOKING (
    id IDENTITY PRIMARY KEY,
    circle_id BIGINT NOT NULL,
    amenity_id BIGINT NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    start_at TIMESTAMP NOT NULL,
    end_at TIMESTAMP NOT NULL,
    status VARCHAR(16) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_bk_am FOREIGN KEY (amenity_id) REFERENCES AMENITY(id)
);