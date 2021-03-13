/*
 * How to run this file
 * NODE_ENV=development node migrations/voice_table.js create
 * NODE_ENV=development node migrations/voice_table.js drop
 *
 */

const dotenvFlow = require("dotenv-flow");
dotenvFlow.config(); // default will take .env file

const { Pool } = require("pg");

let db_uri = process.env.POSTGRES_URL;

console.log("db_uri: ", db_uri);

const pool = new Pool({
  connectionString: db_uri,
});

/**
 * create voice_logs table
 */
const create_voice_logs_table = async () => {
  const createQuery = `
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";
  
    CREATE TABLE IF NOT EXISTS voice_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(150) NOT NULL,
        from_phone_number VARCHAR(20) NOT NULL,
        to_phone_number VARCHAR(20) NOT NULL,
        duration INTEGER NOT NULL,
        start_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        end_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,       
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX from_phone_number_index ON voice_logs (from_phone_number);
  `;

  try {
    await pool.query(createQuery);
    console.log("voice_logs table created");
  } catch (err) {
    console.log(err);
  }
};

/**
 * drop voice_logs Table
 */
const drop_voice_logs_table = async () => {
  const dropQuery = "DROP TABLE IF EXISTS voice_logs";
  try {
    await pool.query(dropQuery);
    console.log("voice_logs table dropped");
  } catch (err) {
    console.log(err);
  }
};

/**
 * Close all active pool connections
 */
const closeConnection = () => {
  pool.end(() => {
    console.log("pool has ended");
    process.exit(0);
  });
};

/**
 * Create All Tables
 */
const createAllTables = async () => {
  try {
    await create_voice_logs_table();
    closeConnection();
  } catch (err) {
    console.log(err);
    closeConnection();
  }
};

/**
 * Drop All Tables
 */
const dropAllTables = async () => {
  // NOTE: do not run if not required
  try {
    await drop_voice_logs_table();
    closeConnection();
  } catch (err) {
    console.log(err);
    closeConnection();
  }
};

module.exports = {
  create: createAllTables,
  drop: dropAllTables,
};

require("make-runnable");
