CREATE TABLE IF NOT EXISTS MENU_ITEM (
    id IDENTITY PRIMARY KEY,
    circle_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description CLOB,
    price_cents BIGINT NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_mi_circle FOREIGN KEY (circle_id) REFERENCES CIRCLE(id)
);

CREATE TABLE IF NOT EXISTS ORDER_HEADER (
    id IDENTITY PRIMARY KEY,
    circle_id BIGINT NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    status VARCHAR(16) NOT NULL,
    total_cents BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_oh_circle FOREIGN KEY (circle_id) REFERENCES CIRCLE(id)
);

CREATE TABLE IF NOT EXISTS ORDER_ITEM (
    id IDENTITY PRIMARY KEY,
    order_id BIGINT NOT NULL,
    menu_item_id BIGINT NOT NULL,
    qty INT NOT NULL,
    price_cents BIGINT NOT NULL,
    CONSTRAINT fk_oi_order FOREIGN KEY (order_id) REFERENCES ORDER_HEADER(id),
    CONSTRAINT fk_oi_menu FOREIGN KEY (menu_item_id) REFERENCES MENU_ITEM(id)
);

CREATE TABLE IF NOT EXISTS MERCHANT (
    id IDENTITY PRIMARY KEY,
    circle_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    contact_json CLOB,
    CONSTRAINT fk_mer_circle FOREIGN KEY (circle_id) REFERENCES CIRCLE(id)
);

CREATE TABLE IF NOT EXISTS PROMO (
    id IDENTITY PRIMARY KEY,
    circle_id BIGINT NOT NULL,
    merchant_id BIGINT,
    title VARCHAR(255) NOT NULL,
    body CLOB,
    starts_at TIMESTAMP,
    ends_at TIMESTAMP,
    active BOOLEAN DEFAULT TRUE,
    claim_count BIGINT DEFAULT 0,
    CONSTRAINT fk_pr_circle FOREIGN KEY (circle_id) REFERENCES CIRCLE(id),
    CONSTRAINT fk_pr_merchant FOREIGN KEY (merchant_id) REFERENCES MERCHANT(id)
);