CREATE TABLE users (
	id SERIAL primary KEY,
	username varchar(80) UNIQUE NOT NULL,
	password varchar(140) NOT NULL,
	email_id INT REFERENCES email
);

CREATE TABLE email (
	id SERIAL primary KEY,
	emailaddress varchar(80) NOT NULL
	);
