import { Request, Router, Response } from 'express';
import tokenValidation from '../middlewares/tokenValidation';
import MatchController from '../controllers/matchController';

const matchController = new MatchController();

const router = Router();

router.post(
  '/',
  tokenValidation.verifyToken,
  (req: Request, res: Response) => matchController.createMatch(req, res),
);

router.get(
  '/',
  (req: Request, res: Response) => matchController.findAllMatches(req, res),
);

router.patch(
  '/:id/finish',
  tokenValidation.verifyToken,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

router.patch(
  '/:id',
  tokenValidation.verifyToken,
  (req: Request, res: Response) => matchController.updateMatch(req, res),
);

export default router;
