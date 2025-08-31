import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '../middleware/auth';
import { LoginRequest, LoginResponse } from '../types';

const router = Router();

router.post('/login', async (req: Request<{}, {}, LoginRequest>, res: Response) => {
  try {
    const { username, password } = req.body;

    // Get admin credentials from environment variables
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    // Check if credentials match
    if (username !== adminUsername) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // For static credentials, we can either:
    // 1. Use plain text comparison (less secure but simpler)
    // 2. Use bcrypt comparison (more secure)
    
    // Option 1: Plain text comparison
    if (password !== adminPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Option 2: If you want to use bcrypt (uncomment and modify as needed)
    // const hashedPassword = await bcrypt.hash(adminPassword, 10);
    // const isValidPassword = await bcrypt.compare(password, hashedPassword);
    // if (!isValidPassword) {
    //   return res.status(401).json({ message: 'Invalid credentials' });
    // }

    // Generate JWT token
    const token = generateToken(username, 'admin');

    const response: LoginResponse = {
      token,
      user: {
        username,
        role: 'admin'
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
