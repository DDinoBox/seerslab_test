import commentDao from '../models/commentDao.js';

const commentCreate = async (userId, boardId, content) => {
    const createComment = await commentDao.createComment(userId, boardId, content);
    return createComment;
};

const getComment = async (commentId) => {
  const getComment = await commentDao.getComment(commentId);
  if (!getComment || getComment.length === 0) {
    const error = new Error('UNREGISTERED_BOARD_ID');
    error.statusCode = 401;
    throw error;
  };
  return getComment;
};
export default { commentCreate, getComment };