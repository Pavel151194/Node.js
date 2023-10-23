import { Response } from 'express';
import { AppRequest } from '../typings/index.js';
import ApiError from '../apiError/apiError.js';
import { Type } from '../models/index.js';

interface TypeCreateBody {
  name: string;
}

class TypeController {
  async create(req: AppRequest<never, TypeCreateBody>, res: Response) {
    try {
      const { name } = req.body;
      const type = await Type.create({ name });
      return res.json(type);
    } catch (e) {
      // TODO: handle error
    }
  }

  async findAll(req: AppRequest, res: Response) {
    try {
      const types = await Type.findAll();
      return res.json(types);
    } catch (e) {
      // TODO: handle error
    }
  }
}

export default new TypeController();
