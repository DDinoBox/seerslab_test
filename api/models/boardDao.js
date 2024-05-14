import { dataSource } from './dataSource.js';

const createBoard = async (userId, title, content) => {
  try {
    const createBoardResult = await dataSource.query(
      'INSERT INTO board (user_id, title, content) VALUES (?, ?, ?)',
      [userId, title, content]
    );
    return createBoardResult.insertId;
  } catch (error) {
    console.error('ERROR CREATING USER:', error);
    throw error;
  }
};

const deleteBoard = async (userId, boardId) => {
  try {
    const result = await dataSource.query(
      `
      DELETE board, comments
      FROM board
      LEFT JOIN comments ON board.id = comments.board_id
      WHERE board.user_id = ? AND board.id = ?
      ;
      `,
      [userId, boardId]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const getPostList = async (offset, limit) => {
  const postDetail = await dataSource.query(
    `
    SELECT
    b.id AS boardId,
    u.name,
    b.title,
    b.content,
    DATE_FORMAT(b.created_at, '%Y-%m-%d %T') AS time,
    (
        SELECT COUNT(*) FROM comments WHERE board_id = b.id
    ) AS commentCount
    FROM 
        board b
    LEFT JOIN 
        users u ON u.id = b.user_id
    GROUP BY 
        b.id, u.name, b.title, b.content, b.created_at
    ORDER BY 
        b.id
    LIMIT ?, ?;`,
    [offset, limit]
  );
  return postDetail;
};

const getPostCount = async () => {
  const count = await dataSource.query(
    `SELECT COUNT(*) AS totalCount FROM board;`
  );
  return count[0].totalCount;
};

const getPostDetail = async (boardId) => {
  try {
    const postDetail = await dataSource.query(
      `
      SELECT
      b.id AS boardId,
      u.id AS userId,
      u.name,
      b.title,
      b.content,
      DATE_FORMAT(b.created_at, '%Y-%m-%d %T') AS time,
      JSON_ARRAYAGG(
          JSON_OBJECT(
              'commentId', c.id,
              'commentTime', DATE_FORMAT(c.created_at, '%Y-%m-%d %T'),
              'name', cu.name,
              'content', c.content
          )
      ) AS comments
      FROM 
          board b
      LEFT JOIN 
          users u ON u.id = b.user_id
      LEFT JOIN 
          comments c ON c.board_id = b.id
      LEFT JOIN 
          users cu ON cu.id = c.user_id
      WHERE 
          b.id = ?
      GROUP BY 
          b.id, u.name, b.title, b.content, b.created_at
      ORDER BY 
          b.created_at DESC;
      `,
      [boardId]
    );
    return postDetail;
  } catch (error) {
    throw error;
  }
};

export default { createBoard, deleteBoard, getPostList, getPostCount, getPostDetail };