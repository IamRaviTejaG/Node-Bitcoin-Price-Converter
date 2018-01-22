# Bitcoin Price Converter (v1.4)
#### [[Live](https://btc-price-converter.herokuapp.com/)]
###### Last Updated: 22 January 2018.

## Dependencies
* Express (`npm install express`)
* Nodemon (`npm install nodemon`)
* Blockchain API (`npm install blockchain.info`)
* Bittrex Node API (`npm install node-bittrex-api`)
* Morgan (`npm install morgan`)
* EJS (`npm install ejs`)
* Request IP (`npm install request-ip`)

## Installing
Clone the repo and run `npm install <foldername>` to install. This will install all the dependencies from `package.json`.

## Using
Use `node app.js` or `nodemon app.js` to run the application and visit `localhost:3000/btc/<yourPreferredCurrency>` in your browser. To change the port, use `PORT=xxxx node app.js` instead.

Replace <yourPreferredCurrency> with `usd`, `inr`, `eur`, `aud`, `cad`, `ltc`, `doge`, etc.

***
##### Change Logs

[v1.4] - [22 January 2018]
* Now using EJS templates instead of Pug.
* Little UI improvements.

[v1.3] - [02 January 2018]
* Now shows Client IP on every request.
* Almost 20 times faster than v1.1.
* Project is now [live here](https://btc-price-converter.herokuapp.com/).

[v1.2] - [20 December 2017]
* Now loads ~15 times faster.

[v1.1] - [15 December 2017]
* Now supports numerous altcoins, thanks to Bittrex API.
* Uses **Pug** (previously, Jade) templating engine instead of normal hardcoded HTML.

[v1.0] - [13 December 2017]
* Initial Release.
* Uses Blockchain API to fetch prices.
* Only supports fiat currencies fetched from the blockchain API data.

***
##### Copyright © 2017 Ravi Teja Gannavarapu
