import { Router } from 'express';
import teamsRouter from './teamsRouter';
import loginRouter from './loginRouter';
import matchRouter from './matchRouter';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);
router.use('/matches', matchRouter);

export default router;
