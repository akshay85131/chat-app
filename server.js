'use strict'
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
// Chat application components
const routes = require('./app/routes')
const session = require('./app/session')
const passport = require('./app/auth')
const ioServer = require('./app/socket')(app)
const port = 3000

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(session)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use('/', routes)

ioServer.listen(port)
