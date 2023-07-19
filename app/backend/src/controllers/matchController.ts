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
    const serviceResponse = await this.matchService.findAllMatches();
    if (serviceResponse.status !== 'SUCCESSFUL') return res.status(400).json(serviceResponse.data);
    res.status(200).json(serviceResponse.data);
  }

  public async findMatchById(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.matchService.findMatchById(id);
    if (serviceResponse.status !== 'SUCCESSFUL') return res.status(400).json(serviceResponse.data);
    res.status(200).json(serviceResponse.data);
  }
}
