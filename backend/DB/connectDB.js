require("dotenv").config();

const { Client } = require("pg");

const client = new Client({
  host: "dpg-ct4lr256l47c73f9srog-a.oregon-postgres.render.com",
  user: "jey",
  port: "5432",
  password: process.env.pass,
  database: "cater_sample",
  ssl: {
    rejectUnauthorized: false,
  },
});

const connectDb = async () => {
  try {
    await client.connect();
    console.log("DB connected");
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
};

connectDb();

module.exports = { client, connectDb };
