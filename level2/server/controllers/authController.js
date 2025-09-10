import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { env } from '../configs/env.js';
import { signJwt } from '../utils/generateToken.js';


function setTokenCookie(res, token) {
res.cookie('token', token, {
httpOnly: true,
secure: env.cookieSecure,
sameSite: env.cookieSecure ? 'none' : 'lax',
maxAge: 7 * 24 * 60 * 60 * 1000
});
}

export const signup = async (req, res) => {
     try {
         const { name, email, password, role = 'user' } = req.body;
         if (!email || !password || !name) return res.status(400).json({ success: false, message: 'Missing fields' });


         const exists = await User.findOne({ email });
         if (exists) return res.status(409).json({ success: false, message: 'Email already in use' });


         const user = await User.create({ name, email, password, role });
         const token = signJwt({ id: user._id, role: user.role });
         setTokenCookie(res, token);
         return res.status(201).json({ success: true, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
     } catch (error) {
         console.error(error);
         return res.status(500).json({ success: false, message: error.message });
}
};


export const logout = async (req, res) => {
      try {
          res.clearCookie('token', { httpOnly: true, sameSite: env.cookieSecure ? 'none' : 'lax', secure: env.cookieSecure });
          return res.json({ success: true, message: 'Logged out' });
      } catch (error) {
           console.error(error);
           return res.status(500).json({ success: false, message: error.message });
}
};

export const login = async (req, res) => {
      try {
          const { email, password } = req.body;
          if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password are required' });


          const user = await User.findOne({ email }).select('+password');
          if (!user) return res.status(401).json({ success: false, message: 'Invalid email or password' });


           const isMatch = await bcrypt.compare(password, user.password);
           if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid email or password' });
           const token = signJwt({ id: user._id, role: user.role });
           setTokenCookie(res, token);


          return res.json({ success: true, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
     } catch (error) {
          console.error(error.message);
          return res.status(500).json({ success: false, message: error.message });
}
};


export const me = async (req, res) => {
    try {
       const token = req.cookies?.token;
       if (!token) return res.json({ success: true, user: null });
       const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
       return res.json({ success: true, user: { id: payload.id, role: payload.role } });
    } catch (error) {
       console.error(error);
       return res.json({ success: true, user: null });
}
};