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

const commentDelete = catchAsync(async ({ user: { id }, body: { commentId }}, res) => {
  if (!commentId) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  };
  const userId = id
  await commentService.commentDelete(userId, commentId);
  res.status(200).json({ message: 'COMMENT_DELETED' });
});

const getComment = catchAsync(async (req, res) => {
  const commentId = req.params.commentId;
  const getComment = await commentService.getComment(commentId);
  res.status(200).json({ data: getComment });
});

export default { commentCreate, getComment, commentDelete };