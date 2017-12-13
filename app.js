var express = require('express')
var morgan = require('morgan')
var app = express()

app.set('port', process.env.PORT || 3000)
app.use(morgan('tiny'))
app.use(require('./routes/btc'))

var server  = app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'))
})
