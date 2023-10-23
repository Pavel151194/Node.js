import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { UserRole } from '../models/userModel.js';

export interface RequestUser {
  id: number;
  email: string;
  role: UserRole;
}

export interface AppRequest<ReqParams = never, ReqBody = never, ReqQuery = never>
  extends Request<ReqParams, never, ReqBody, ReqQuery> {
  user?: RequestUser & JwtPayload;
}
