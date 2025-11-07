import { Router } from 'express';
import boardController from '../controllers/boardController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware); // All routes below this will be protected

router.post('/', boardController.createBoard);
router.get('/', boardController.getBoards);
router.get('/:id', boardController.getBoardById);
router.patch('/:id', boardController.updateBoard);
router.delete('/:id', boardController.deleteBoard);

export default router;
