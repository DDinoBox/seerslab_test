import boardDao from '../models/boardDao.js';

const boardCreate = async (userId, title, content) => {
    const createBoard = await boardDao.createBoard(userId, title, content);
    return createBoard;
};

const boardDelete = async (userId, boardId) => {
  const postDetail = await boardDao.getPostDetail(boardId);
  if (!postDetail || postDetail.length === 0) {
    const error = new Error('UNREGISTERED_BOARD_ID');
    error.statusCode = 401;
    throw error; 
  };
  if (postDetail[0].userId !== userId) {
    const error = new Error('INCORRECT_USER_ID');
    error.statusCode = 401;
    throw error;
  };   
  await boardDao.deleteBoard(userId, boardId);
};

const getPostList = async (offset, limit) => {
  const [getPostList, totalCount] = await Promise.all([
    boardDao.getPostList(offset, limit),
    boardDao.getPostCount()
  ]);
  return [getPostList, totalCount];
};

const getPostDetail = async (postId) => {
  const postDetail = await boardDao.getPostDetail(postId);
  if (!postDetail || postDetail.length === 0) {
    const error = new Error('UNREGISTERED_BOARD_ID');
    error.statusCode = 401;
    throw error;
  };
  return postDetail;
};

export default { boardCreate, boardDelete, getPostList, getPostDetail };