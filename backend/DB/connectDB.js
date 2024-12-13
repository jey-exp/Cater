require("dotenv").config();

const { Client } = require("pg");

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
});

const connectDb = async () => {
  try {
    await client.connect();
    console.log("DB connected ✅");
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
};

connectDb();

module.exports = { client, connectDb };
