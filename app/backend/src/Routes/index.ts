import { Router } from 'express';
import teamsRouter from './teamsRouter';
import loginRouter from './loginRouter';
import matchRouter from './matchRouter';
import lbRouter from './lbRouter';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);
router.use('/matches', matchRouter);
router.use('/leaderboard', lbRouter);

export default router;
