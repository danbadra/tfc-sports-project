import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/lbController';

const lbController = new LeaderboardController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => lbController.homeTeamsLb(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => lbController.awayTeamsLb(req, res),
);

// router.get(
//   '/',
//   (req: Request, res: Response) => lbController.leaderboard(req, res),
// );

export default router;
