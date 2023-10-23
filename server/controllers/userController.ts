import { Response, NextFunction } from 'express';
import { compareSync, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppRequest } from '../typings/index.js';
import ApiError from '../apiError/apiError.js';
import { User, Basket } from '../models/index.js';
import { UserRole } from '../models/userModel.js';

interface UserAuthBody {
  email: string;
  password: string;
  role?: UserRole;
}

// TODO: add random_secret_key to env variables
const generateToken = (id: number, email: string, role: UserRole) =>
  jwt.sign({ id, email, role }, 'random_secret_key', { expiresIn: '24h' });

class UserController {
  async registration(req: AppRequest<never, UserAuthBody>, res: Response, next: NextFunction) {
    try {
      const { email, password, role } = req.body;
      // TODO: implement authorisation module
      if (!email || !password) {
        return next(ApiError.badRequest('Wrong email or password'));
      }

      const candidate = await User.findOne({ where: { email } });

      if (candidate) {
        return next(ApiError.badRequest('This email has already taken'));
      }

      const hashedPassword = await hash(password, 5);
      const user = await User.create({ email, password: hashedPassword, role });
      // TODO: move Basket.create to User.create event
      await Basket.create({ userId: user.id });

      const token = generateToken(user.id, user.email, user.role);
      res.json({ token });
    } catch (e) {
      // TODO: handle error
    }
  }

  async login(req: AppRequest<never, UserAuthBody>, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return next(ApiError.badRequest('This user has not registered yet'));
      }

      const comparedPassword = compareSync(password, user.password);

      if (!comparedPassword) {
        return next(ApiError.badRequest('Wrong password'));
      }

      const token = generateToken(user.id, user.email, user.role);
      res.json({ token });
    } catch (e) {
      // TODO: handle error
    }
  }

  async verify(req: AppRequest, res: Response,) {
    try {
      const { id, email, role } = req.user!;

      const token = generateToken(id, email, role);

      return res.json({ token });
    } catch (e) {
      // TODO: handle error
    }
  }
}

export default new UserController();
