import { Request, Response } from 'express';
import { getUserById } from '../services/userService';

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    console.log('userId:', userId);
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
