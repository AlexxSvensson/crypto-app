module.exports = function(io, interval) {
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
          jsonData.data.forEach((item) => {
            cryptos[item.symbol] = {price: item.quote.USD.price, name: item.name, rank: item.cmc_rank};
          });
          io.sockets.emit("cryptoPriceUpdates", {cryptos: cryptos});
        });
      }).on('error', (e) => {
        console.error(e);
      });
    }, 300000);
    return interval;
  }
  return null;
}