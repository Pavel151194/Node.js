import { DataTypes } from 'sequelize';
import { BasketModel } from './basketModel.js';
import { BasketDeviceModel } from './basketDeviceModel.js';
import { BrandModel } from './brandModel.js';
import { DeviceModel } from './deviceModel.js';
import { DeviceInfoModel } from './deviceInfoModel.js';
import { RatingModel } from './ratingModel.js';
import { TypeModel } from './typeModel.js';
import { TypeBrandModel } from './typeBrandModel.js';
import { UserModel, UserRole } from './userModel.js';
import sequelize from '../db.js';

export const Basket = sequelize.define<BasketModel>('basket', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

export const BasketDevice = sequelize.define<BasketDeviceModel>('basket_device', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

export const Brand = sequelize.define<BrandModel>('brand', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
});

export const Device = sequelize.define<DeviceModel>('device', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  price: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: false },
});

export const DeviceInfo = sequelize.define<DeviceInfoModel>('device_info', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

export const Rating = sequelize.define<RatingModel>('rating', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false },
});

export const Type = sequelize.define<TypeModel>('type', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
});

export const User = sequelize.define<UserModel>('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: UserRole.USER },
});

const TypeBrand = sequelize.define<TypeBrandModel>('type_brand', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(Rating);
Rating.belongsTo(Device);

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);

Device.hasMany(DeviceInfo, { as: 'info' });
DeviceInfo.belongsTo(Device);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });
