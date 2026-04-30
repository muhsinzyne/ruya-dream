CREATE TABLE IF NOT EXISTS dream_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    device_id VARCHAR(255) NOT NULL,
    ip_address VARCHAR(255),
    dream_text TEXT NOT NULL,
    status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS dream_results (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    request_id BIGINT NOT NULL,
    islamic_summary TEXT,
    islamic_symbols JSON,
    islamic_notes TEXT,
    scientific_summary TEXT,
    scientific_factors JSON,
    scientific_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES dream_requests(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS request_limits (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    device_id VARCHAR(255) NOT NULL,
    request_date DATE NOT NULL,
    request_count INT DEFAULT 1,
    UNIQUE KEY unique_device_date (device_id, request_date)
);
