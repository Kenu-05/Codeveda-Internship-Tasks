import { Router } from 'express';
import { login, signup, logout, me } from '../controllers/authController.js';


const router = Router();


// POST /api/user/signup
router.post('/signup', signup);


// POST /api/user/login
router.post('/login', login);

// POST /api/user/logout
router.post('/logout', logout);


// GET /api/user/me
router.get('/me', me);


export default router;