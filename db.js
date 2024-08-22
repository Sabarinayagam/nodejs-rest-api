const mysql = require("mysql2/promise");
const { host, db_user, db_password, db_name } = require("./config");

const pool = mysql.createPool({
  host: host,
  user: db_user,
  password: db_password,
  database: db_name,
});

module.exports = pool;
