import { Router } from 'express';
import typeController from '../controllers/typeController.js';
import roleValidator from '../middleware/roleValidator.js';
import { UserRole } from '../models/userModel.js';

const router = Router();

router.post('/', roleValidator(UserRole.ADMIN), typeController.create);
router.get('/', typeController.findAll);

export default router;
