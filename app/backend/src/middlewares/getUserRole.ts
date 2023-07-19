import { Request, Response } from 'express';

export default class getUserRole {
  public static getUserRole(req: Request, res: Response) {
    const { user } = res.locals;
    // console.log(res.locals.user);
    return res.status(200).json({ role: user.role });
  }
}
