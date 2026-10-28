
CREATE TABLE IF NOT EXISTS warranty_ticket (
    ticket_id SERIAL PRIMARY KEY,
    ticket_code VARCHAR(50) NOT NULL UNIQUE,
    product_name VARCHAR(100) NOT NULL,
    status VARCHAR(30) NOT NULL,
    completed_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS survey (
    survey_id SERIAL PRIMARY KEY,
    ticket_id INT NOT NULL UNIQUE,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    feedback TEXT,
    nps_score INT CHECK (nps_score BETWEEN 0 AND 10),
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_survey_ticket
        FOREIGN KEY (ticket_id)
        REFERENCES warranty_ticket(ticket_id)
);
