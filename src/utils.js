import path from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);

export const createHash = async (password) => {
  try {
    const hash = await bcrypt.hash(password, bcrypt.genSaltSync(10));
    return hash;
  } catch (error) {
    throw error;
  }
};

export const isValidPassword = async (password, user) => {
  const match = await bcrypt.compare(password, user.password);
  return match;
};

export class Exception extends Error {
  constructor(message, status) {
    super(message);
    this.statusCode = status;
  }
};


const JWT_SECRET = 'qBvPkU2X;J1,51Z!~2p[JW.DT|g:4l@';

export const tokenGenerator = (user) => {
  const { _id, first_name, last_name, email } = user;
  const payload = {
    id: _id,
    first_name,
    last_name,
    email,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1m' });
}

export const jwtAuth = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) {
    return res.status(401).json({ message: 'unauthorized' });
  }
  jwt.verify(token, JWT_SECRET, async (error, payload) => {
    if (error) {
      return res.status(403).json({ message: 'No authorized' });
    }
    req.user = await UserModel.findById(payload.id);
    next();
  });
}
