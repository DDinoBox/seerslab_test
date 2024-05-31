import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

import userDao from '../models/userDao.js';
import validateEmailAndPassword from '../utils/validate.js';

dotenv.config();

const saltRounds = 10;

// Function to hash the password
const hashPassword = async (plaintextPassword) => {
  return bcrypt.hash(plaintextPassword, saltRounds);
};

const signUp = async (email, password, name) => {
  validateEmailAndPassword(email, password);

  const hashedPassword = await hashPassword(password);
  const createUser = await userDao.createUser(email, hashedPassword, name);
  
  return createUser;
};

const signIn = async (email, password) => {
  const user = await userDao.getUserByEmail(email);

  if (!user) {
    const error = new Error('UNREGISTERED_USER_EMAIL');
    error.statusCode = 401;
    throw error;
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    const error = new Error('PASSWORD_IS_INCORRECT');
    error.statusCode = 401;
    throw error;
  }
  const accessToken = await jwt.sign({ email: email }, process.env.JWT_SECRET_KEY, {
    algorithm: process.env.JWT_ALGORITHM,
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return { accessToken, name: user.name };
};

export default { signUp, signIn };