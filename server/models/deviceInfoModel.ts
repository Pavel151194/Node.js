import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

interface CreationAttributes extends DeviceInfoModel {
  deviceId: number;
}

export interface DeviceInfoModel
  extends Model<InferAttributes<DeviceInfoModel>, InferCreationAttributes<CreationAttributes>> {
  id: CreationOptional<number>;
  title: string;
  description: string;
}
