import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface TypeModel extends Model<InferAttributes<TypeModel>, InferCreationAttributes<TypeModel>> {
  id: CreationOptional<number>;
  name: string;
}
