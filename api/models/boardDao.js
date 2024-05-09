import { dataSource } from './dataSource.js';

const createBoard = async (userId, title, content) => {
  try {
    const createBoardResult = await dataSource.query(
      'INSERT INTO board (user_id, title, content) VALUES (?, ?, ?)',
      [userId, title, content]
    );
    return createBoardResult;
  } catch (error) {
    console.error('ERROR CREATING USER:', error);
    throw error;
  }
};

export default { createBoard };