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

	CREATE TABLE teams (
	id SERIAL primary KEY,
	team varchar(80) UNIQUE NOT NULL
);

	CREATE TABLE cards (
	id SERIAL primary KEY,
	name varchar not null,
	image_name varchar not null,
	team varchar not null,
	color1 varchar not null,
	color2 varchar not null,
	catagory varchar not null,
	question1 varchar(180) not null,
	question2 varchar(180) not null,
	question3 varchar(180) not null,
	user_id int references users
);
