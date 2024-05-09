import boardDao from '../models/boardDao.js';

const boardCreate = async (userId, title, content) =>{
    await boardDao.createBoard(userId, title, content);
};

export default { boardCreate };