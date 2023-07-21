import { Request, Router, Response } from 'express';
import HomeLeaderboardController from '../controllers/lbController';

const homeLbController = new HomeLeaderboardController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => homeLbController.homeTeamsLb(req, res),
);

// router.get(
//   '/away',
//   (req: Request, res: Response) => lbController.awayTeamsLb(req, res),
// );

// router.get(
//   '/',
//   (req: Request, res: Response) => lbController.leaderboard(req, res),
// );

export default router;
