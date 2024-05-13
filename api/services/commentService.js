import commentDao from '../models/commentDao.js';

const commentCreate = async (userId, boardId, content) => {
    const createComment = await commentDao.createComment(userId, boardId, content);
    return createComment;
};

const commentDelete = async (userId, commentId) => {
  const getComment = await commentDao.getComment(commentId);
  if (!getComment || getComment.length === 0) {
    const error = new Error('UNREGISTERED_COMMENT_ID');
    error.statusCode = 401;
    throw error; 
  };
  if (getComment[0].userId !== userId) {
    const error = new Error('INCORRECT_USER_ID');
    error.statusCode = 401;
    throw error;
  };   
  await commentDao.deleteComment(userId, commentId);
};

const getComment = async (commentId) => {
  const getComment = await commentDao.getComment(commentId);
  if (!getComment || getComment.length === 0) {
    const error = new Error('UNREGISTERED_COMMENT_ID');
    error.statusCode = 401;
    throw error;
  };
  return getComment;
};

export default { commentCreate, getComment, commentDelete };