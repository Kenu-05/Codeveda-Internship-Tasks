// server/configs/env.js
import dotenv from 'dotenv';
dotenv.config();

export const env = {
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  cookieSecure: process.env.COOKIE_SECURE === 'false', // true if using HTTPS
};
