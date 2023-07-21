import { Request, Response } from 'express';
import HomeLeaderboardService from '../services/homeLbService';

export default class HomeLeaderboardController {
  constructor(
    private homeLbService = new HomeLeaderboardService(),
  ) { }

  public async homeTeamsLb(req: Request, res: Response): Promise<Response> {
    const result = await this.homeLbService.sortHomeLb();

    return res.status(200).json(result);
  }
}
