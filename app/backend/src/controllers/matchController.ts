import { Request, Response } from 'express';
import MatchService from '../services/matchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async createMatch(req: Request, res: Response) {
    const serviceResponse = await this.matchService.createMatch(req.body);
    res.status(201).json(serviceResponse.data);
  }

  public async findAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const inProgressString = inProgress?.toString();
    const serviceResponse = await this.matchService.findAllMatches(inProgressString);
    if (serviceResponse.status !== 'SUCCESSFUL') return res.status(400).json(serviceResponse.data);
    res.status(200).json(serviceResponse.data);
  }

  // public async filterMatches(req: Request, res: Response) {
  //   const { inProgress } = req.query;
  //   const inProgressString = inProgress?.toString();
  //   const serviceResponse = await this.matchService.filterMatches(inProgressString);
  //   if (serviceResponse.status !== 'SUCCESSFUL') return res.status(400).json(serviceResponse.data);
  //   res.status(200).json(serviceResponse.data);
  // }
}
