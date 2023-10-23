import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

interface CreationAttributes extends BasketModel {
  userId: number;
}

export interface BasketModel extends Model<InferAttributes<BasketModel>, InferCreationAttributes<CreationAttributes>> {
  id: CreationOptional<number>;
}
