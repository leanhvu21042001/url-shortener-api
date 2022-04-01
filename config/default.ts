import dotenvSafe from 'dotenv-safe';

dotenvSafe.config();

export default {
  port: 5050,
  dbUri: process.env.DB_URI,
};
