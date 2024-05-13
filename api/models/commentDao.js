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

const getComment = async (commentId) => {
  try {
    const commentDetail = await dataSource.query(
      `
      SELECT
        c.id AS commentId,
        u.name,
        c.content,
        DATE_FORMAT(c.created_at, '%Y-%m-%d %T') AS time
      FROM comments c
      LEFT JOIN users u ON u.id = c.user_id
      WHERE c.id = ?
      `,
      [commentId]
    );
    return commentDetail;
  } catch (error) {
    throw error;
  }
};

export default { createComment, getComment };