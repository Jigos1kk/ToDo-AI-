'use strict'

require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DEV_MYSQL_USER || "root",
    password: process.env.DEV_MYSQL_PASSWORD || null,
    database: process.env.DEV_MYSQL_DATABASE || "database_development",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: process.env.TEST_MYSQL_USER || "root",
    password: process.env.TEST_MYSQL_PASSWORD || null,
    database: process.env.TEST_MYSQL_DATABASE || "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: process.env.PROD_MYSQL_USER || "root",
    password: process.env.PROD_MYSQL_PASSWORD ||  null,
    database: process.env.PROD_MYSQL_DATABASE || "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
}
