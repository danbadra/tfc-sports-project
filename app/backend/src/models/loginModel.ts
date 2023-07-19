import * as bcrypt from 'bcryptjs';
import { Login } from '../types/loginType';
import jwt from '../utils/JWT';
import SequelizeUser from '../database/models/SequelizeUser';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IUser from '../Interfaces/Users/IUser';

export default class LoginModel {
  private model = SequelizeUser;
  private webToken = jwt;

  async validateLogin(login: Login): Promise<ServiceResponse<IUser>> {
    const foundUser = await this.model.findOne({ where: { email: login.email } });
    if (!foundUser || !bcrypt.compareSync(login.password, foundUser.dataValues.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'E-mail ou senha inválidos' } };
    }
    const userToken = this.webToken.createToken(foundUser.dataValues);
    return { status: 'SUCCESSFUL', token: userToken };
  }
}
