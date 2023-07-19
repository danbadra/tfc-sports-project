import { Request, Response, NextFunction } from 'express';

export default class passwordValidation {
  public static verifyPasswordExists(req: Request, res: Response, next: NextFunction) {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    next();
  }

  public static verifyPasswordForm(req: Request, res: Response, next: NextFunction) {
    const { password } = req.body;
    if (password.length < 6) {
      return res.status(401)
        .json({ message: 'Invalid email or password' });
    }
    next();
  }
}
