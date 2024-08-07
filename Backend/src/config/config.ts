import { config as conf } from "dotenv";
conf();

const _config = {
  //_config shows it is a private variable
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV,
  JSON_WEB_TOKEN_SECRET: process.env.JSON_WEB_TOKEN_SECRET,
  // JWT_SECRET:process.env.JWT_SECRET,
  // JWT_EXPIRE:process.env.JWT_EXPIRE,
  // JWT_COOKIE_EXPIRE:process.env.JWT_COOKIE_EXPIRE
};

export const config = Object.freeze(_config);
