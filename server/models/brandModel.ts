import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface BrandModel extends Model<InferAttributes<BrandModel>, InferCreationAttributes<BrandModel>> {
  id: CreationOptional<number>;
  name: string;
}
