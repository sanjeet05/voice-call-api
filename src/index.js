// make bluebird default Promise
Promise = require("bluebird"); // eslint-disable-line no-global-assign
const { port, env, postgresUrl } = require("./config/vars");
const app = require("./config/express");
// const mongoose = require('./config/mongoose');
// redis
// const redis = require("./config/redis");

const db = require("../src/api/models");

// socket
const http = require("http");
const socketIo = require("socket.io");

// open mongoose connection
// mongoose.connect();

// open redis connection
// redis.connect();

// database setup: authenticate it.
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established with postgres successfully.");
    console.log("postgres_uri: ", postgresUrl);
  })
  .catch((err) => {
    console.error("Unable to connect with postgres database:");
    console.log("postgres_error: ", err);
  });

const server = http.createServer(app);

const io = socketIo(server);
// io.set("transports", ["websocket"]);

io.on("connection", (socket) => {
  console.log("New socket.io client connected");

  console.log("connection", socket.id);

  // for getting a notification
  socket.on("subscribeToNotification", () => {
    console.log("client is subscribing to notification");
  });

  socket.on("disconnect", () => {
    console.log("disconnect", socket.id);
  });
});

// for global access
global.io = io;

// listen to requests
server.listen(port, () => console.info(`server started on port ${port} (${env})`));

/**
 * Exports express
 * @public
 */
module.exports = app;
