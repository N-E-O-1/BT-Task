const express = require('express')
const dotenv = require('dotenv')
const app = express()
const mongoose = require('mongoose')
const user = require('./routes/user')
const auth = require('./routes/auth')
const reset = require('./routes/passwordresetlink')

app.use(express.json())
app.use('/api/user',user)
app.use('/api/user',auth)
app.use('/api/password-reset',reset)
dotenv.config()

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('connected to mongodb..'))
    .catch((err) => console.log(err))

app.listen(process.env.PORT||3000, () => {
    console.log('listening to port..')
})
