import boardDao from '../models/boardDao.js';

const boardCreate = async (userId, title, content) =>{
    await boardDao.createBoard(userId, title, content);
};

const getPostList = async () => {
  return await boardDao.getPostList();
};

const getPostDetail = async (postId) => {
  const postDetail = await boardDao.getPostDetail(postId);
  return postDetail;
};

export default { boardCreate, getPostList, getPostDetail };