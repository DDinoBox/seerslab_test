import commentDao from '../models/commentDao.js';

const commentCreate = async (userId, boardId, content) => {
    const createComment = await commentDao.createComment(userId, boardId, content);
    return createComment;
};

export default { commentCreate };