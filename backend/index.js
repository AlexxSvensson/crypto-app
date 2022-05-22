const express = require('express');
const https = require('https');
const cors = require('cors');
// import { createServer } from 'http';
require('dotenv/config');

let interval = null;
const cryptos = {};

const app = express();
app.use(express.json());
const corsOptions = {
  origin: 'http://127.0.0.1:3000',
  methods: ['GET', 'POST']
}
app.use(cors(corsOptions));
app.set('port', process.env.PORT || 3001);

const server = app.listen(app.get("port"), () => {
  setUpCRCinterval();
  console.log("Server is running");
});

const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
});


io.on("connection", (socket) => {
    console.log(socket.id, "connected");
    socket.emit("connection", {cryptos: cryptos});
});

// app.get('/crypto/', (req, res) => {
//   const data = [];
//   const symbols = JSON.parse(req.query.symbols);
//   if (!symbols) res.status(400).send();
//   symbols.forEach(symbol => {
//     console.log(symbol)
//     if (cryptos.get(symbol)) {
//       data.push({"symbol": symbol, "price": cryptos.get(symbol)});
//     }
//   });
//   res.status(200).send({"data" : data});
// });



const setUpCRCinterval = () => {
  if (interval === null) {
    interval = setInterval(async () => {
      https.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=' + process.env.API_KEY, (res) => {
        res.setEncoding('utf8');
        let data = "";
        res.on('data', (d) => {
          data += d;
        });
        res.on('end', () => {
          const jsonData = JSON.parse(data);
          console.log(jsonData.data)
          jsonData.data.forEach((item) => {
            cryptos[item.symbol] = {price: item.quote.USD.price, name: item.name, rank: item.cmc_rank};
          });
          io.sockets.emit("cryptoPriceUpdates", {cryptos: cryptos});
        });
      }).on('error', (e) => {
        console.error(e);
      });
    }, 300000);
  }
}