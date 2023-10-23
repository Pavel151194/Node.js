import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

interface CreationAttributes extends DeviceModel {
  brandId: number;
  typeId: number;
}

export interface DeviceModel extends Model<InferAttributes<DeviceModel>, InferCreationAttributes<CreationAttributes>> {
  id: CreationOptional<number>;
  name: string;
  price: number;
  rating: CreationOptional<number>;
  img: string;
}
