const express = require('express')
require('./db/mongoose')

const UsersRouter = require('./routers/Users')
const EventsRouter = require('./routers/Events')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors())

const port = process.env.PORT || 8000

app.use(bodyParser.json())
app.use(UsersRouter)
app.use(EventsRouter)
app.listen(port, () => {
    console.log(`server is up to port :${port}`);
})