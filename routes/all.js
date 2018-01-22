const express = require('express')
const requestIP = require('request-ip')
const router = express.Router()
const app = express()

app.set('views', './views')
app.set('view engine', 'ejs')

router.get('/all', function (req, res) {
  const clientIp = requestIP.getClientIp(req)
  res.render('all', {cIP: clientIp})
})

module.exports = router
