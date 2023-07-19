import { Request, Response, NextFunction } from 'express';
import JWT from '../utils/JWT';

export default class tokenValidation {
  public static verifyToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const data = authorization.split(' ');
    const token = data[1];

    console.log(token);
    if (!token) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    try {
      res.locals.user = JWT.decodeToken(token);
      return next();
    } catch (error) {
      res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
