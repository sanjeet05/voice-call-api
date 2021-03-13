const { Sequelize, DataTypes } = require("sequelize");
const { postgresUrl } = require("../../config/vars");

const options = {
  dialect: "postgres",
  logging: process.env.DATABASE_DEBUG_MODE == "true" ? console.log : false,
  pool: {
    min: 0,
    max: 5,
    acquire: 30000,
    idle: 10000, // 10 sec
  },
};

// using uri
let sequelize = new Sequelize(postgresUrl, options);

// let sequelize = new Sequelize({
//   username: process.env.DATABASE_USER || "postgres",
//   password: process.env.DATABASE_PASSWORD || "",
//   database: process.env.DATABASE_NAME || "",
//   host: process.env.DATABASE_HOST || "127.0.0.1",
//   dialect: "postgres",
//   logging: process.env.DATABASE_DEBUG_MODE ? console.log : false,
//   pool: {
//     min: 0,
//     max: 5,
//     acquire: 30000,
//     idle: 10000, // 10 sec
//   },
// });

const db = {};

// models
db.voiceLog = require("./voiceLog.model")(sequelize, DataTypes);

// association
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
