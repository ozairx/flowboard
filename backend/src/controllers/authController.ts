import { Request, Response } from 'express';
import authService from '../services/authService';

class AuthController {
  async register(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password, name } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const user = await authService.register({ email, password, name });
      return res.status(201).json(user);
    } catch (error) {
      // Basic error handling, consider more specific checks (e.g., for unique constraint violation)
      return res.status(500).json({ message: 'User registration failed', error });
    }
  }
}

export default new AuthController();
