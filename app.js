var express = require('express')
var morgan = require('morgan')
var app = express()

app.set('port', process.env.PORT || 3000)
app.set('views', './views')
app.set('view engine', 'pug')
app.use(morgan('tiny'))
app.use('/public', express.static('public'))
app.use(require('./routes/btc'))

app.get('/', function (req, res) {
  res.render('index.pug')
})

var server  = app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'))
})
