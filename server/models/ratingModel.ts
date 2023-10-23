import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface RatingModel extends Model<InferAttributes<RatingModel>, InferCreationAttributes<RatingModel>> {
  id: CreationOptional<number>;
  rate: number;
}
