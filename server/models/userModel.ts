import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  id: CreationOptional<number>;
  email: string;
  password: string;
  role: CreationOptional<UserRole>;
}
