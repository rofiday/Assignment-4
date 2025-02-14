require("dotenv").config();
module.exports = {
  development: {
    username: process.env.DB_USERNAME_DEVELOPMENT || "root",
    password: process.env.DB_PASSWORD_DEVELOPMENT || "null",
    database: process.env.DB_DATABASE_DEVELOPMENT || "database_development",
    host: process.env.DB_HOST_DEVELOPMENT || "127.0.0.1",
    dialect: process.env.DB_DIACLECT_DEVELOPMENT || "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
