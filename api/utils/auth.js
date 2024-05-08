import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userDao from '../models/userDao.js';

dotenv.config();

const loginRequired = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      const error = new Error('NEED_ACCESS_TOKEN');
      error.statusCode = 401;
      return res.status(error.statusCode).json({ message: error.message });
    }

    const payload = await jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    const user = await userDao.getUserByEmail(payload['email']);

    if (!user) {
      const error = new Error('USER_DOES_NOT_EXIST');
      error.statusCode = 404;
      return res.status(error.statusCode).json({ message: error.message });
    }
    req.user = user;
    console.log(user)
    next();
  } catch {
    const error = new Error('INVALID_ACCESS_TOKEN');
    error.statusCode = 401;
    return res.status(error.statusCode).json({ message: error.message });
  }
};

export default loginRequired;