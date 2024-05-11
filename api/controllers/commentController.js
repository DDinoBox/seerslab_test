import commentService from '../services/commentService.js';
import { catchAsync } from '../utils/error.js';

const commentCreate =  catchAsync(async({ user: { id }, body: { boardId, content }}, res) => {
  if (!boardId || !content) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  };
  const userId = id
  await commentService.commentCreate(userId, boardId, content);
  res.status(201).json({ message: 'SUCCESS' });  
});

export default { commentCreate };