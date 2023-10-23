import { Response } from 'express';
import { AppRequest } from '../typings/index.js';
import ApiError from '../apiError/apiError.js';
import { Brand } from '../models/index.js';


interface BrandCreateBody {
  name: string;
}

class BrandController {
  async create(req: AppRequest<never, BrandCreateBody>, res: Response) {
    try {
      const { name } = req.body;
      const brand = await Brand.create({ name });
      return res.json(brand);
    } catch (e) {
      // TODO: handle error
    }
  }

  async findAll(req: AppRequest, res: Response) {
    try {
      const brands = await Brand.findAll();
      return res.json(brands);
    } catch (e) {
      // TODO: handle error
    }
  }
}

export default new BrandController();
