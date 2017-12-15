var bittrex = require('node.bittrex.api')
var express = require('express')
var exchange = require('blockchain.info/exchange')
var router = express.Router()
var app = express()

app.set('views', './views')
app.set('view engine', 'pug')
app.use(express.static('../'))

var bittrexData, blockchainData;
bittrex.options({
  'apikey': '6f47f58c26d84bb5821b98d61bc28503',
  'apisecret': 'aef8944dea224836ad1dd9e2d9329f1e'
})

router.get('/btc/:currency', function (req, res) {
  var blockchainData = exchange.getTicker()
  var curr = req.params.currency.toUpperCase()
  var marketname = "BTC-" + curr
  var rate
  blockchainData.then(function (onSuccess, onReject) {
    if (!(curr in onSuccess)) {
      /* Work in progress!
      bittrex.getmarketsummaries(function (data, err) {
        var a = 0
        for (var i=0; i<data.length; i++) {
          if (data[i].MarketName === marketname)
            a = 1
        }
        if (a === 0) {
          res.render('notfound.pug')
        }
      })
      */
      bittrex.getmarketsummary({market: marketname}, function (data, err) {
        rate = parseFloat(1/(data.result[0].Last)).toFixed(4)
        res.render('btc.pug', {rate: rate, fromCurr: "BTC", toCurr: curr})
      })
    }
    else if (curr in onSuccess) {
      rate = onSuccess[curr].last
      rate = parseFloat(rate).toFixed(2)
      res.render('btc.pug', {rate: rate, fromCurr: "BTC", toCurr: curr})
    }
    else {
      res.render('notfound.pug') // Unfortunately, never gets rendered! :(
    }
  })
})

module.exports = router
