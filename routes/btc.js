var express = require('express')
var exchange = require('blockchain.info/exchange')
var router = express.Router()

router.get('/btc/:currency', function (req, res) {
  var curr = req.params.currency.toUpperCase()
  var receivePromise = exchange.getTicker()
  receivePromise.then(function (onSuccess, onReject) {
    // console.log(onSuccess)
    var rate = onSuccess[curr]['last']
    console.log(rate)
    res.send(`<!DOCTYPE html>
    <html>
    <head>
    	<meta charset="UTF8">
    	<!--
      <link rel='stylesheet' href='css/style.css'>
      <link rel='stylesheet' href='css/bootstrap.min.css'>
      -->
      <style>
      @import url('https://fonts.googleapis.com/css?family=Barlow');
      /*
        @media(max-width: 768px) {
        	label {
        		font-size: 50%;
        	}
        }
        @media(min-width: 768px) {
        	label {
        		font-size: 70%;
        	}
        }
        @media(min-width: 992px) {
        	label {
        		font-size: 90%;
        	}
        }
        @media(min-width: 1200px) {
        	label {
        		font-size: 200%;
        	}
        }
        */
        * {
        	font-family: Barlow;
        }
        h3 {
        	display: inline-block;
        }
        p {
          padding-left: 120px;
        }
        .in {
        	// border: 0px;
        	display: inline-block;
        	font-size: 200%;
        }
        input {
          border: 2px solid #00fcc6;
          border-radius: 5px;
          font-size: 80%;
          width: 250px;
        }
        label, p {
          font-size: 200%;
        }
      </style>
    	<title>${rate} ${curr} / BTC | Bitcoin Price Converter</title>
    </head>
    <body>
      <script>
        var c = ${rate}
        function myFunction1() {
          document.getElementById('fiat_out').value = (parseFloat(document.getElementById('btc_in').value) * c).toFixed(2);
        }
        function myFunction2() {
          document.getElementById('btc_in').value = (parseFloat(document.getElementById('fiat_out').value) / c).toFixed(4);
        }
      </script>
      <div class='container-fluid'>
      <h1>BTC -> ${curr}</h1>
      <div class='col-xs-offset-0 col-sm-offset-1 col-md-offset-2 col-lg-offset-3 form-group'>
        <input type='text' name='btc_in' class='in col-xs-4 col-sm-3 col-md-2 col-lg-2' id='btc_in' value=1 onkeyup='myFunction1()'><label class='col-xs-2 col-sm-2 col-md-2 col-lg-1'> BTC </label><br>
        <p class='col-xs-4 col-sm-3 col-md-2 col-lg-2'>=</p><br>
        <input type='text' name='fiat_out' class='in col-xs-4 col-sm-3 col-md-2 col-lg-2' id='fiat_out' value=${rate} onkeyup='myFunction2()'><label class='col-xs-2 col-sm-2 col-md-2 col-lg-1'> ${curr} </label>
      </div>
      </div>
    </body>
    </html>`)
  })
})

module.exports = router
