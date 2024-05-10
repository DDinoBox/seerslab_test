import boardService from '../services/boardService.js';
import { catchAsync } from '../utils/error.js';

const boardCreate =  catchAsync(async({ user: { id }, body: { title, content }}, res) => {
  const userId = id
  await boardService.boardCreate(userId, title, content);
  res.status(201).json({ message: 'SUCCESS' });  
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

export default { boardCreate, getBoard, getPostDetail };