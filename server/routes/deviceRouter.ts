import { Router } from 'express';
import deviceController from '../controllers/deviceController.js';
import roleValidator from '../middleware/roleValidator.js';
import { UserRole } from '../models/userModel.js';

const router = Router();

router.post('/', roleValidator(UserRole.ADMIN), deviceController.create);
router.get('/', deviceController.findAll);
router.get('/:id', deviceController.findOne);

export default router;
