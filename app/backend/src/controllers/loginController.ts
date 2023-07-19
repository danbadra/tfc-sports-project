import { Request, Response } from 'express';
import LoginService from '../services/loginService';

export default class LoginController {
  constructor(
    private loginService = new LoginService(),
  ) { }

  public async validateLogin(req: Request, res: Response) {
    const { password, email } = req.body;
    const login = { email, password };
    const result = await this.loginService.validateLogin(login);

    if (result.status !== 'SUCCESSFUL') {
      return res.status(401)
        .json({ message: result.data.message });
    }

    return res.status(200).json({ token: result.token });
  }

  // public async getUserRole(req: Request, res: Response) {
  //   const { email } = res.locals.user;
  //   console.log(res.locals.user);
  //   const result = await this.loginService.getUserRole(email);

  //   if (result.status !== 'SUCCESSFUL') {
  //     return res.status(401).json({ message: result.data.message });
  //   }

  //   return res.status(200).json({ data: role });
  // }
}
