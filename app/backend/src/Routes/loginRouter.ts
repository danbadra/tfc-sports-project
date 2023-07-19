import { Request, Router, Response } from 'express';
import passwordValidation from '../middlewares/passwordValidation';
import emailValidation from '../middlewares/emailValidation';
import LoginController from '../controllers/loginController';

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

export default router;
