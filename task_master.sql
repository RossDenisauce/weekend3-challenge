CREATE TABLE tasks (
id SERIAL PRIMARY KEY,
author VARCHAR(30) NOT NULL,
description VARCHAR(255) NOT NULL,
completion VARCHAR(3) DEFAULT 'No'
);

INSERT INTO tasks (author, description, completion)
VALUES ('Ross', 'Finish making this app', 'Yes'), ('Ross', 'Get a lot better at CSS', 'No');

SELECT * FROM tasks;

