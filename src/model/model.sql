CREATE DATABASE exam;

CREATE TABLE users (
user_id BIGSERIAL PRIMARY KEY,
user_name VARCHAR(64) NOT NULL,
user_email VARCHAR(80) UNIQUE NOT NULL,
user_password VARCHAR(80) NOT NULL,
isadmin BOOLEAN DEFAULT false
);

CREATE TABLE directions(
    direction_id BIGSERIAL PRIMARY KEY,
    direction_name VARCHAR(100) UNIQUE NOT NULL
  
);



CREATE TABLE queue(
    queue_id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(80) NOT NULL,
    phone_number VARCHAR(30) NOT NULL,
    direction_name VARCHAR(110) NOT NULL,
    queue_time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    is_active BOOLEAN DEFAULT false
);


CREATE TABLE queue_history (
    queue_id int,
    first_name VARCHAR(70),
last_name text,
phone_number VARCHAR(35),
direction_name VARCHAR(110),
queue_time TIMESTAMPTZ
)


CREATE OR REPLACE FUNCTION deleteQueue()
RETURNS TRIGGER
LANGUAGE plpgsql
AS

$$

BEGIN

    INSERT INTO queue_history(queue_id, first_name, last_name, phone_number, direction_name, queue_time) VALUES(OLD.queue_id, OLD.first_name, OLD.last_name, OLD.phone_number, OLD.direction_name, OLD.queue_time);
    RETURN OLD;

END

$$;


CREATE TRIGGER deleteTrg
BEFORE DELETE
ON queue
FOR EACH ROW
EXECUTE PROCEDURE deleteQueue();