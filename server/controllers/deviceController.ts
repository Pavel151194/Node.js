import { Response, NextFunction } from 'express';
import { v4 as getId } from 'uuid';
import path, { resolve as getDirName } from 'path';
import { UploadedFile } from 'express-fileupload';
import { AppRequest } from '../typings/index.js';
import ApiError from '../apiError/apiError.js';
import { Device, DeviceInfo } from '../models/index.js';

interface DeviceCreateBody {
  name: string;
  price: number;
  brandId: number;
  typeId: number;
  info?: string;
}

interface DeviceFindAllQuery {
  brandId: number;
  typeId: number;
  limit?: number;
  page?: number;
}

interface DeviceFindOneParams {
  id: number;
}

class DeviceController {
  async create(req: AppRequest<never, DeviceCreateBody>, res: Response, next: NextFunction) {
    try {
      const { name, price, brandId, typeId, info } = req.body;
      const img = req.files!.img as UploadedFile;
      const fileName = `${getId()}.jpg`;
      img.mv(path.resolve(getDirName(), '..', 'static', fileName));

      const device = await Device.create({ name, price, brandId, typeId, img: fileName });

      if (info) {
        const deviceInfo: Array<{ title: string; description: string }> = JSON.parse(info);
        deviceInfo.forEach(({ title, description }) => {
          DeviceInfo.create({ title, description, deviceId: device.id });
        });
      }

      return res.json(device);
    } catch (e) {
      // TODO: add getErrorMessage util
      if (e instanceof Error) {
        next(ApiError.badRequest(e.message));
      }
    }
  }

  async findAll(req: AppRequest<never, never, DeviceFindAllQuery>, res: Response) {
    try {
      const { brandId, typeId, limit: queryLimit, page: queryPage } = req.query;
      const limit = Number(queryLimit) || 9;
      const page = Number(queryPage) || 1;
      const offset = page * limit - limit;

      const whereClause =
        (brandId && typeId && { brandId, typeId }) ||
        (brandId && !typeId && { brandId }) ||
        (!brandId && typeId && { typeId });

      const devices = await Device.findAndCountAll({ limit, offset, ...(whereClause && { where: whereClause }) });

      return res.json(devices);
    } catch (e) {
      // TODO: handle error
    }
  }

  async findOne(req: AppRequest<DeviceFindOneParams>, res: Response) {
    try {
      const { id } = req.params;
      const device = await Device.findOne({ where: { id }, include: [{ model: DeviceInfo, as: 'info' }] });
      return res.json(device);
    } catch (e) {
      // TODO: handle error
    }
  }
}

export default new DeviceController();
