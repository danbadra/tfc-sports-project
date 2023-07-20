import { Request, Response } from 'express';
import MatchService from '../services/matchService';

const noMatchFound = 'No match found';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async createMatch(req: Request, res: Response) {
    const newMatch = req.body;
    const serviceResponse = await this.matchService.createMatch(newMatch);
    if (serviceResponse.status === 'INVALID_DATA') {
      return res.status(422).json(serviceResponse.data);
    }
    if (serviceResponse.status === 'NOT_FOUND') {
      return res.status(404).json(serviceResponse.data);
    }
    return res.status(201).json(serviceResponse.data);
  }

  public async findAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const inProgressString = inProgress?.toString();
    const serviceResponse = await this.matchService.findAllMatches(inProgressString);
    if (serviceResponse.status !== 'SUCCESSFUL') return res.status(400).json(serviceResponse.data);
    res.status(200).json(serviceResponse.data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.matchService.finishMatch(Number(id));
    if (serviceResponse === 'No match Found') return res.status(400).json(noMatchFound);
    res.status(200).json(serviceResponse);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const update = req.body;
    const serviceResponse = await this.matchService.updateMatch(Number(id), update);
    if (serviceResponse === 'No match Found') return res.status(400).json(noMatchFound);
    res.status(200).json(serviceResponse);
  }
}
