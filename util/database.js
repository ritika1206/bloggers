const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "bloggers",
    password: "ritika1234"
});

module.exports = pool.promise();