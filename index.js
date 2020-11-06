// Load .env file
require('dotenv').config();

// Load required libraries from node_modules
const express = require('express')
const hbs = require('express-handlebars')
const morgan = require('morgan')

// Configure the environment
const PORT = parseInt(process.env.PORT) || 3000

// Create the database connection pool (used for MySQL)
const pool = require('./public/javascript/create_pool')
const startApp = require('./public/javascript/start_app')

// Create an instance of the express application
const app = express()

// Configure handlebars to manage views
app.engine('hbs', hbs({ defaultLayout: 'default.hbs' }))
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')

// Configure morgan
app.use(morgan('combined'))

// Configure the static files
app.use(express.static(__dirname + '/public'))

// Load router from routes.js
const router = require('./public/javascript/routes')

// Connect router
app.use(router())

// Start express
startApp(app, pool)