import { Login } from '../types/loginType';
import IUser from '../Interfaces/Users/IUser';
import LoginModel from '../models/loginModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class LoginsService {
  protected loginModel = new LoginModel();

  public async validateLogin(login: Login): Promise<ServiceResponse<IUser>> {
    const userToken = await this.loginModel.validateLogin(login);
    if (userToken.status !== 'SUCCESSFUL') {
      return { status: 'INVALID_DATA', data: { message: 'Invalid email or password' } };
    }
    return { status: 'SUCCESSFUL', token: userToken.token };
  }
}
