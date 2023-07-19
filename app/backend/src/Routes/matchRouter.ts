import { Request, Router, Response } from 'express';
import MatchController from '../controllers/matchController';

const matchController = new MatchController();

const router = Router();

router.post(
  '/',
  (req: Request, res: Response) => matchController.createMatch(req, res),
);

router.get(
  '/',
  (req: Request, res: Response) => matchController.findAllMatches(req, res),
);

router.get(
  '/:id',
  (req: Request, res: Response) => matchController.findMatchById(req, res),
);

export default router;
