CREATE TABLE potato (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    happiness INTEGER NOT NULL,
    last_action TEXT NOT NULL
);

INSERT INTO potato (happiness, last_action) VALUES (50, 'None');