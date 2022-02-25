const {fetch, fetchAll} = require('../../lib/postgres')

const DIRECTION = `
SELECT
*
FROM
directions
`

const ADD_DIRECTION = `
INSERT INTO directions(direction_name)
VALUES ($1)
RETURNING
*
`

const DELETE_QUEUE = `
DELETE 
FROM
 queue
 where queue_id = $1
`

const ALL_HISTORY = `
SELECT
*
FROM
queue_history
`

const QUEUE_HISTORY = `
SELECT
*
FROM
queue_history
WHERE
queue_id = $1
`




const addDirection = (direction_name) => fetch(ADD_DIRECTION, direction_name)

const deleteQueue = (id) => fetch(DELETE_QUEUE, id)

const Direction = () => fetchAll(DIRECTION)

const QueueHistory = (id) => fetchAll(QUEUE_HISTORY, id)
const AllHistory = () => fetchAll(ALL_HISTORY)


module.exports = {
    addDirection,
    AllHistory,
    Direction,
    deleteQueue,
    QueueHistory,

}