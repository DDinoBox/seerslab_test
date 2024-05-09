import boardService from '../services/boardService.js';
import { catchAsync } from '../utils/error.js';

const boardCreate =  catchAsync(async({ user: { id }, body: { title, content }}, res) => {
  const userId = id
  await boardService.boardCreate(userId, title, content);
  res.status(201).json({ message: 'SUCCESS' });  
});

export default { boardCreate };