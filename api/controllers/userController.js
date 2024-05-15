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

const signIn = catchAsync(async ({ body: { email, password } }, res) => {
  const result = await userService.signIn(email, password);
  res.status(200).json(result); 
})

export default { signUp, signIn };