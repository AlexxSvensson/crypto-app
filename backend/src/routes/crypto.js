module.exports = function(app){
    app.get('/crypto/', (req, res) => {
      const data = [];
      const symbols = JSON.parse(req.query.symbols);
      if (!symbols) res.status(400).send();
      symbols.forEach(symbol => {
          console.log(symbol)
          if (cryptos.get(symbol)) {
        data.push({"symbol": symbol, "price": cryptos.get(symbol)});
      }
    });
    res.status(200).send({"data" : data});
  });
}