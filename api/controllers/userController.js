import userService from '../services/userService.js';
import { catchAsync } from '../utils/error.js';

const signUp = catchAsync(async ({ body: { email, password, name } }, res) => {
  if (!email || !password || !name) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  await userService.signUp(email, password, name);

  res.status(201).json({ message: 'USER_SIGN_UP_COMPLETE' });
});

export default { signUp };