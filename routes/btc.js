var bittrex = require('node.bittrex.api')
var express = require('express')
var exchange = require('blockchain.info/exchange')
var router = express.Router()
var app = express()

app.set('views', './views')
app.set('view engine', 'pug')
app.use(express.static('../'))

bittrex.options({
  'apikey': '6f47f58c26d84bb5821b98d61bc28503',
  'apisecret': 'aef8944dea224836ad1dd9e2d9329f1e'
})

var fiat = ['USD', 'AUD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'DKK', 'EUR',
  'GBP', 'HKD', 'INR', 'ISK', 'JPY', 'KRW', 'NZD', 'PLN', 'RUB', 'SEK',
  'SGD', 'THB', 'TWD']

var crypto = ['LTC', 'DOGE', 'VTC', 'PPC', 'FTC', 'RDD', 'NXT', 'DASH',
  'POT', 'BLK', 'EMC2', 'XMY', 'AUR', 'EFL', 'GLD', 'SLR', 'PTC', 'GRS',
  'NLG', 'RBY', 'XWC', 'MONA', 'THC', 'ENRG', 'ERC', 'VRC', 'CURE', 'XMR',
  'CLOAK', 'START', 'KORE', 'XDN', 'TRUST', 'NAV', 'XST', 'BTCD', 'VIA',
  'PINK', 'IOC', 'CANN', 'SYS', 'NEOS', 'DGB', 'BURST', 'EXCL', 'SWIFT',
  'DOPE', 'BLOCK', 'ABY', 'BYC', 'XMG', 'BLITZ', 'BAY', 'FAIR', 'SPR',
  'VTR', 'XRP', 'GAME', 'COVAL', 'NXS', 'XCP', 'BITB', 'GEO', 'FLDC',
  'GRC', 'FLO', 'NBT', 'MUE', 'XEM', 'CLAM', 'DMD', 'GAM', 'SPHR', 'OK',
  'SNRG', 'PKB', 'CPC', 'AEON', 'ETH', 'GCR', 'TX', 'BCY', 'EXP', 'INFX',
  'OMNI', 'AMP', 'AGRS', 'XLM', 'CLUB', 'VOX', 'EMC', 'FCT', 'MAID', 'EGC',
  'SLS', 'RADS', 'DCR', 'SAFEX', 'BSD', 'XVG', 'PIVX', 'XVC', 'MEME', 'STEEM',
  '2GIVE', 'LSK', 'PDC', 'BRK', 'DGD', 'WAVES', 'RISE', 'LBC', 'SBD', 'BRX',
  'ETC', 'STRAT', 'UNB', 'SYNX', 'TRIG', 'EBST', 'VRM', 'SEQ', 'XAUR', 'SNGLS',
  'REP', 'SHIFT', 'ARDR', 'XZC', 'NEO', 'ZEC', 'ZCL', 'IOP', 'GOLOS', 'UBQ',
  'KMD', 'GBG', 'SIB', 'ION', 'LMC', 'QWARK', 'CRW', 'SWT', 'MLN', 'ARK',
  'DYN', 'TKS', 'MUSIC', 'DTB', 'INCNT', 'GBYTE', 'GNT', 'NXC', 'EDG', 'LGD',
  'TRST', 'WINGS', 'RLC', 'GNO', 'GUP', 'LUN', 'APX', 'HMQ', 'ANT', 'SC',
  'BAT', 'ZEN', '1ST', 'QRL', 'CRB', 'PTOY', 'MYST', 'CFI', 'BNT', 'NMR',
  'SNT', 'DCT', 'XEL', 'MCO', 'ADT', 'FUN', 'PAY', 'MTL', 'STORJ', 'ADX',
  'OMG', 'CVC', 'PART', 'QTUM', 'BCC', 'DNT', 'ADA', 'MANA', 'SALT', 'TIX',
  'RCN', 'VIB', 'MER', 'POWR', 'BTG', 'ENG']

var frl, crl, crlMarketName = []
function fetchBlockchainData () {
  var blockchainData = exchange.getTicker()
  blockchainData.then(function (onSuccess, onReject) {
    frl = onSuccess
  })
}
function fetchBittrexData () {
  var bittrexData = bittrex.getmarketsummaries(function (data, err) {
    crl = data
  })
  if (crl !== undefined) {
    for (var i=0; i<crl.result.length;i++) {
      crlMarketName.push(crl.result[i].MarketName)
    }
  }
}

// First fetch
fetchBlockchainData()
fetchBittrexData()

// Refresh data every 2 seconds
setInterval(fetchBlockchainData, 2000)
setInterval(fetchBittrexData, 2000)

router.get('/btc/:currency', function (req, res) {
  var curr = req.params.currency.toUpperCase(), rate
  if (fiat[fiat.indexOf(curr)] === curr) {
    rate = frl[curr].last
    rate = parseFloat(rate).toFixed(2)
    res.render('btc.pug', {rate: rate, fromCurr: 'BTC', toCurr: curr})
  } else if (crypto[crypto.indexOf(curr)] === curr) {
    var marketname = "BTC-" + curr
    rate = crl.result[crlMarketName.indexOf(marketname)].Last
    rate = parseFloat(1/rate).toFixed(4)
    res.render('btc.pug', {rate: rate, fromCurr: 'BTC', toCurr: curr})
  } else {
    res.render('notfound.pug')
  }
})

module.exports = router
