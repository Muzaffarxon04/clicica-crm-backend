const {fetch, fetchAll} = require('../../lib/postgres')


// ALL USERS

const USERS = `
SELECT
*
FROM
users
where
isadmin != true
`
const ADMINS = `
SELECT
*
FROM
users
where
isadmin = true
`


const REGISTER = `
INSERT INTO users(
    user_name,
    user_email,
    user_password)
VALUES
($1, $2, $3)
` 

const QUEUE = `
SELECT
*
FROM
queue
`


const ADDQUEUE = `
INSERT INTO queue(
    first_name,
    last_name,
     phone_number,
     direction_name)
VALUES
($1, $2, $3, $4)
RETURNING 
*
`
const Users = () => fetchAll(USERS)
const Admins = () => fetchAll(ADMINS)

const addUser = (user_name, user_email, user_password) => fetch(REGISTER, user_name, user_email, user_password)

const addQueue = (first_name, last_name, phone_number, direction_name) => fetchAll(ADDQUEUE, first_name, last_name, phone_number, direction_name)

const Queue = () => fetchAll(QUEUE)

module.exports = {
    addUser,
    Users,
    Admins,
    Queue,
    addQueue
}