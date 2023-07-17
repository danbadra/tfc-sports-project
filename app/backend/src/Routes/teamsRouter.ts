import { Request, Router, Response } from 'express';
import TeamController from '../controllers/teamsController';

const teamController = new TeamController();

const router = Router();

router.post(
  '/',
  (req: Request, res: Response) => teamController.createTeam(req, res),
);

router.get(
  '/',
  (req: Request, res: Response) => teamController.findAllTeams(req, res),
);

router.get(
  '/:id',
  (req: Request, res: Response) => teamController.findTeamById(req, res),
);

export default router;
