import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface BasketDeviceModel
  extends Model<InferAttributes<BasketDeviceModel>, InferCreationAttributes<BasketDeviceModel>> {
  id: CreationOptional<number>;
}
