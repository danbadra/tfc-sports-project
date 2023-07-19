import { Request, Response, NextFunction } from 'express';

export default class emailValidation {
  public static verifyEmailExists(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    next();
  }

  public static verifyEmailForm(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!regex.test(email)) {
      return res.status(401)
        .json({ message: 'Invalid email or password' });
    }
    next();
  }
}
