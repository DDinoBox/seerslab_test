import { dataSource } from './dataSource.js';

const createComment = async (userId, boardId, content) => {
  try {
    const createCommentResult = await dataSource.query(
      'INSERT INTO comments (user_id, board_id, content) VALUES (?, ?, ?)',
      [userId, boardId, content]
    );
    return createCommentResult.boardId;
  } catch (error) {
    console.error('ERROR CREATING USER:', error);
    throw error;
  }
};

export default { createComment };