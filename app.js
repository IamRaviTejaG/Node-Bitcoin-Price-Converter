const express = require('express')
const morgan = require('morgan')
const requestIP = require('request-ip')
const app = express()

app.set('port', process.env.PORT || 3000)
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(morgan('dev'))
app.use('/public', express.static('public'))
app.use(require('./routes/all'))
app.use(require('./routes/btc'))

app.get('/', function (req, res) {
  const clientIp = requestIP.getClientIp(req)
  res.render('index', {cIP: clientIp})
})

var server  = app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'))
})
