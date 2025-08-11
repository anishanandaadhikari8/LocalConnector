CREATE TABLE IF NOT EXISTS FORECAST (
    id IDENTITY PRIMARY KEY,
    circle_id BIGINT NOT NULL,
    amenity_id BIGINT,
    horizon_date DATE NOT NULL,
    hourly_pred_json CLOB,
    recommended_slot_mins INT,
    surge_hours_json CLOB,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS TRIAGE_LABEL (
    id IDENTITY PRIMARY KEY,
    incident_id BIGINT NOT NULL,
    severity_pred VARCHAR(64),
    category_pred VARCHAR(128),
    duplicate_incident_id BIGINT,
    confidence DOUBLE,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS MAINTENANCE_RISK (
    id IDENTITY PRIMARY KEY,
    circle_id BIGINT NOT NULL,
    amenity_id BIGINT,
    risk_score DOUBLE,
    mtbf_days DOUBLE,
    top_signals_json CLOB,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS ANOMALY_ALERT (
    id IDENTITY PRIMARY KEY,
    circle_id BIGINT NOT NULL,
    metric_key VARCHAR(128),
    window_start TIMESTAMP,
    window_end TIMESTAMP,
    zscore DOUBLE,
    direction VARCHAR(16),
    context_json CLOB,
    status VARCHAR(16) NOT NULL,
    created_at TIMESTAMP NOT NULL
);