// app/server.js

// Import dependencies.
import express from 'express'
import exphbs from 'express-handlebars'
import cookieParser from 'cookie-parser'
import fs from 'fs'
import path from 'path'


// Create new express instance.
const app = express()

// Register all middlewares.
const hbs = exphbs.create({
  extname: '.hbs',
  helpers: {
    times: function (n, block) {
      var accum = '';
      for (var i = 1; i <= n; ++i)
        accum += block.fn(i);
      return accum;
    }
  }
})
app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')
app.use(express.static('static'))
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())
app.use(cookieParser());

fs.readdir(path.resolve('controllers'), 'utf8', function (err, files) {
  if (err) {
    return log.info(err.message)
  }
  files.forEach(function (file) {
    app.use(require('../controllers/' + file))
  })
})

// Start server.
let server = app.listen(process.env.APP_PORT, process.env.APP_HOST, _ => {
  log.info(`Server was listened on ${process.env.APP_HOST}:${process.env.APP_PORT}`)
})

// Write to logs on server error.
server.on('error', function (err) {
  log.error(err)
})
