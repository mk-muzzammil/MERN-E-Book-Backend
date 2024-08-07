import { config as conf } from "dotenv";
conf();

const _config = {
  //_config shows it is a private variable
  PORT: process.env.PORT,
  // MONGO_URI:process.env.MONGO_URI,
  // JWT_SECRET:process.env.JWT_SECRET,
  // JWT_EXPIRE:process.env.JWT_EXPIRE,
  // JWT_COOKIE_EXPIRE:process.env.JWT_COOKIE_EXPIRE
};

export const config = Object.freeze(_config);
