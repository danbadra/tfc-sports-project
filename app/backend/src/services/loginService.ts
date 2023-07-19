import { Login } from '../types/loginType';
import IUser from '../Interfaces/Users/IUser';
import LoginModel from '../models/loginModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class LoginsService {
  protected loginModel = new LoginModel();

  public async validateLogin(login: Login): Promise<ServiceResponse<IUser>> {
    if (!login.email || !login.password) {
      return { status: 'INVALID_DATA', data: { message: 'All fields must be filled' } };
    }
    const userToken = await this.loginModel.validateLogin(login);
    if (userToken.status !== 'SUCCESSFUL') {
      return { status: 'INVALID_DATA', data: { message: 'E-mail ou senha inválidos' } };
    }
    return { status: 'SUCCESSFUL', token: userToken.token };
  }
}
