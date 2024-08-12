import { config as conf } from "dotenv";
conf();

const _config = {
  //_config shows it is a private variable
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV,
  JSON_WEB_TOKEN_SECRET: process.env.JSON_WEB_TOKEN_SECRET,
  Cloudinary_api_key: process.env.Cloudinary_api_key,
  Cloudinary_api_secret: process.env.Cloudinary_api_secret,
  Cloudinary_Cloud_Name: process.env.Cloudinary_Cloud_Name,
  FRONTEND_URL: process.env.FRONTEND_URL,
  FRONTEND_URL_2: process.env.FRONTEND_URL_2,
  NOOFBOOKSPERPAGE: process.env.NOOFBOOKSPERPAGE,
  CLIENT_URL: process.env.CLIENT_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,

  // JWT_SECRET:process.env.JWT_SECRET,
  // JWT_EXPIRE:process.env.JWT_EXPIRE,
  // JWT_COOKIE_EXPIRE:process.env.JWT_COOKIE_EXPIRE
};

export const config = Object.freeze(_config);
