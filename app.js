const express = require('express')
const fs = require('fs')
const morgan = require('morgan')
const requestIP = require('request-ip')
const app = express()

const timenow = Date.now()
var a = './ipdata/' + timenow + '.txt'
var b = 'Server Restarted at: ' + timenow + '\n'
fs.appendFile(a, b, (err) => {
  if (err) console.log(timenow + ': New IP log file creation failed!')
  console.log(timenow + ': New IP log file created successfully!')
})

app.set('port', process.env.PORT || 3000)
app.set('views', './views')
app.set('view engine', 'pug')
app.set('ipdatafilepath', a)
app.use(morgan('dev'))
app.use('/public', express.static('public'))
app.use(require('./routes/btc'))

app.get('/', function (req, res) {
  const clientIp = requestIP.getClientIp(req)
  res.render('index.pug', {cIP: clientIp})
})

var server  = app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'))
})
