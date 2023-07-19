import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

type TokenPayload = {
  id: number,
  email: string,
};

function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, secret) as TokenPayload;
}

const createToken = (payload: TokenPayload) => {
  const token = jwt.sign(payload, secret);
  return token;
};

export default {
  createToken,
  verifyToken,
};
