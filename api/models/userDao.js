import { dataSource } from './dataSource.js';

const createUser = async (email, password, name) => {
  try {
    // Check for existing email
    const checkEmail = await dataSource.query(
      'SELECT COUNT(email) AS result FROM users WHERE email = ?',
      [email]
    );
    
    const result = checkEmail[0].result;

    if (result > 0) {
      const error = new Error('EMAIL_ALREADY_EXISTS');
      error.statusCode = 409;
      throw error;
    };

    // Create user
    const createUserResult = await dataSource.query(
      'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
      [email, password, name]
    );

    return createUserResult;
  } catch (error) {
    console.error('ERROR CREATING USER:', error);
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const [result] = await dataSource.query(
      `
        SELECT
          id,
          email,
          password,
          name
        FROM users
        WHERE email = ?
      `,
      [email]
    );
    return result;
  } catch {
    const error = new Error('DATASOURCE_ERROR');
    error.statusCode = 400;

    throw error;
  }
};

export default { createUser, getUserByEmail };