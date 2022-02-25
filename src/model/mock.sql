INSERT INTO users(
    user_name,
     user_email,
      user_password,
       isadmin)
VALUES
('admin', 'admin', 'admin', true);


INSERT INTO directions(direction_name)
VALUES
('lor'),
('Ginikolog'),
('Urolog'),
('Hirurg'),
('Lobarant');


INSERT INTO queue(first_name, last_name, phone_number, direction_name)
VALUES
('Alisher', 'Vahobov', '+998992345678');
