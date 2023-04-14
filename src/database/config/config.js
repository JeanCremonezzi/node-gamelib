import * as dotenv from 'dotenv';
dotenv.config();

const config = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": "localhost",
    "dialect": "mysql"
  }
}

export default config;