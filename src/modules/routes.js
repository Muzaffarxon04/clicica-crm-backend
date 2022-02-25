const {Router} = require('express')

const router = new Router()

const Directions = require('./admin/admin')
const Queue = require('./users/user')
router
.post('/register', Queue.REGISTER)
.post('/login', Queue.LOGIN)
.post('/adminlogin', Queue.ADDMIN_LOGIN)
    .get('/admins/users', Queue.USERS)
    .post('/queue', Queue.ADDQUEUE) /*NAVBAT OLISH */
    .get('/admins/orders', Queue.QUEUE) /*USERNING NAVBATNI KO'RISH */
    .get('/directions', Directions.DIRECTION) /*YONALISHLAR */
    .post('/directions', Directions.ADD_DIRECTION) /*YONALISH QO'SHISH*/
    .delete('/directions/:id', Directions.DELETE_DIRECTION) 
    .delete('/admins/orders/:id', Directions.DELETE_QUEUE) 
    .get('/admins/oldusers', Directions.ALL_HISTORY) /*USERNING NAVBATNI KO'RISH */
    .get('/admins/oldusers/:id', Directions.QUEUE_HISTORY) /*USER HISTIRY  WHERE ID*/



module.exports = router