const startUp = () => {
  const express = require('express');
  const https = require('https');
  const cors = require('cors');
  const cookieParser = require('cookie-parser')
  require('dotenv/config');

  let interval = null;
  const cryptos = {};
  
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  
  const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
  app.use(cors(corsOptions));
  app.set('port', process.env.PORT || 3001);
  require('./src/routes/index')(app);
  
  const server = app.listen(app.get("port"), () => {
    interval = require("./src/setUpCMCinterval")(io, interval);
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
  })
};

module.exports = startUp;