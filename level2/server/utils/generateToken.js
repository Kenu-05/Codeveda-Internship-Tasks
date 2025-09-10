// server/utils/generateToken.js
import jwt from 'jsonwebtoken';
import { env } from '../configs/env.js';

export const signJwt = (payload) => {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: '7d' });
};
