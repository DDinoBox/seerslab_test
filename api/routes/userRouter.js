import express from 'express';
import userController from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/sign_up', userController.signUp);

export default userRouter ;