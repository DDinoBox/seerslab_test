import boardService from '../services/boardService.js';
import { catchAsync } from '../utils/error.js';

const boardCreate =  catchAsync(async({ user: { id }, body: { title, content }}, res) => {
  if (!title || !content) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  };
  const userId = id
  const boardId = await boardService.boardCreate(userId, title, content);
  res.status(201).json({ message: 'SUCCESS',boardId });  
});


const boardDelete = catchAsync(async ({ user: { id }, body: { boardId }}, res) => {
  if (!boardId) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  };
  const userId = id
  await boardService.boardDelete(userId, boardId);
  res.status(200).json({ message: 'FILE_DELETED' });
});

const getBoard = catchAsync(async (req, res) => {
  const getPostList = await boardService.getPostList();
  res.status(200).json({ data: getPostList });
});

const getPostDetail = catchAsync(async (req, res) => {
  const postId = req.params.postId;
  const postDetail = await boardService.getPostDetail(postId);
  return res.status(201).json(postDetail);
});

export default { boardCreate, boardDelete, getBoard, getPostDetail};