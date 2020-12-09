const express = require('express')
const routes = express.Router()

const FileController = require('./controllers/FileController')
routes.post('/pdf', FileController.pdf)
routes.post('/img', FileController.img)

module.exports = routes