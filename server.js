const express = require('express')
const fileupload = require('express-fileupload')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(fileupload({useTempFiles : true, tempFileDir : 'public/tmp'}))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// rotas
app.use('/api/upload', require('./src/routes'))

app.listen(8080)