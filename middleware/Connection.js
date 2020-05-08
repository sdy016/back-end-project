require('dotenv').config();


var mysql = require('mysql2/promise');
var pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MY_SQL_CONNECTION_HOST,
  user: process.env.MY_SQL_CONNECTION_USER,
  password: process.env.MY_SQL_CONNECTION_PASSWORD,
  port: process.env.MY_SQL_CONNECTION_PORT,
  database: process.env.MY_SQL_CONNECTION_DB,
})
module.exports = pool