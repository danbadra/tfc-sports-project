import { Request, Router, Response } from 'express';
import getUserRole from '../middlewares/getUserRole';
import passwordValidation from '../middlewares/passwordValidation';
import emailValidation from '../middlewares/emailValidation';
import LoginController from '../controllers/loginController';
import tokenValidation from '../middlewares/tokenValidation';

const loginController = new LoginController();

const router = Router();

router.post(
  '/',
  emailValidation.verifyEmailExists,
  emailValidation.verifyEmailForm,
  passwordValidation.verifyPasswordExists,
  passwordValidation.verifyPasswordForm,
  (req: Request, res: Response) => loginController.validateLogin(req, res),
);

router.get(
  '/role',
  tokenValidation.verifyToken,
  (req: Request, res: Response) => getUserRole.getUserRole(req, res),
);

export default router;
