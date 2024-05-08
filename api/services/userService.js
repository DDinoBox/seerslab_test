import bcrypt from 'bcrypt';
import userDao from '../models/userDao.js';
import { validateEmailAndPassword } from '../utils/validate.js';

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

export default { signUp };