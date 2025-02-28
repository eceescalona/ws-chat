CREATE TABLE IF NOT EXISTS users 
(
    id uuid PRIMARY KEY, 
    email VARCHAR(320) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    password BYTEA NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS rooms
(
    id uuid PRIMARY KEY, 
    name TEXT NOT NULL,
    owner uuid REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS room_members
(
    room_id uuid REFERENCES rooms(id), 
    user_id uuid REFERENCES users(id),
    PRIMARY KEY (room_id, user_id)
);

CREATE TABLE IF NOT EXISTS messages
(
    id uuid PRIMARY KEY,
    content TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    user_id uuid REFERENCES users(id),
    room_id uuid REFERENCES rooms(id)
);