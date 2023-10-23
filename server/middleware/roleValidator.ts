import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppRequest, RequestUser } from '../typings/index.js';
import { UserRole } from '../models/userModel.js';

export default (role: UserRole) => (req: AppRequest, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Unauthorized user' });

    // TODO: add random_secret_key to env variables
    const tokenPayload = jwt.verify(token, 'random_secret_key') as RequestUser;
    
    if (tokenPayload.role !== role) return res.status(403).json({ message: 'No access' });

    req.user = tokenPayload as typeof req.user;

    next();
  } catch (e) {
    res.status(401).json({ message: 'Unauthorized user' });
  }
};
