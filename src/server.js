const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000
const router = require('./modules/routes')
const cors = require('cors')


app.use(cors())
app.use(express.json())

app.use(router)

app.get('/', (req, res) => {
    res.send('Ok')
})



app.listen(PORT, console.log(PORT))
