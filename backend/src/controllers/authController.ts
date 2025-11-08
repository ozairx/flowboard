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

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const result = await authService.login({ email, password });

      if (!result) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: 'Login failed', error });
    }
  }
}

export default new AuthController();
