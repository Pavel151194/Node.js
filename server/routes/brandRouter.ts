import { Router } from 'express';
import brandController from '../controllers/brandController.js';
import roleValidator from '../middleware/roleValidator.js';
import { UserRole } from '../models/userModel.js';

const router = Router();

router.post('/', roleValidator(UserRole.ADMIN), brandController.create);
router.get('/', brandController.findAll);

export default router;
