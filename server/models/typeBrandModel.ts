import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface TypeBrandModel
  extends Model<InferAttributes<TypeBrandModel>, InferCreationAttributes<TypeBrandModel>> {
  id: CreationOptional<number>;
}
