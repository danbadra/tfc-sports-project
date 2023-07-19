import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

type TokenPayload = {
  id: number,
  email: string,
};

const createToken = (payload: TokenPayload): string => {
  const token = jwt.sign(payload, secret);
  return token;
};

function decodeToken(token: string): TokenPayload {
  const decoded = jwt.verify(token, secret);
  return decoded as TokenPayload;
}

export default {
  createToken,
  decodeToken,
};
