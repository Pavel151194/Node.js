import { Router } from 'express';
import userController from '../controllers/userController.js';
import authValidator from '../middleware/authValidator.js';

const router = Router();

router.post('/login', userController.login);
router.post('/registration', userController.registration);
router.get('/auth', authValidator, userController.verify);

export default router;
