import { Router } from 'express';
import brandRouter from './brandRouter.js';
import deviceRouter from './deviceRouter.js';
import typeRouter from './typeRouter.js';
import userRouter from './userRouter.js';

const router = Router();

router.use('/brand', brandRouter);
router.use('/device', deviceRouter);
router.use('/type', typeRouter);
router.use('/user', userRouter);

export default router;
