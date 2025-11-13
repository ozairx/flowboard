import { Router } from "express";
import boardController from "../controllers/boardController";
import listController from "../controllers/listController";
import cardController from "../controllers/cardController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.use(authMiddleware); // All routes below this will be protected

router.post("/", boardController.createBoard);
router.get("/", boardController.getBoards);
router.get("/:id", boardController.getBoardById);
router.patch("/:id", boardController.updateBoard);
router.delete("/:id", boardController.deleteBoard);

// List routes nested under boards
router.post("/:boardId/lists", listController.createList);
router.patch("/:boardId/lists/:listId", listController.updateList);
router.delete("/:boardId/lists/:listId", listController.deleteList);
router.patch("/:boardId/lists/reorder", listController.reorderLists);

// Card routes nested under lists
router.post("/:boardId/lists/:listId/cards", cardController.createCard);
router.patch(
  "/:boardId/lists/:listId/cards/:cardId",
  cardController.updateCard,
);
router.delete(
  "/:boardId/lists/:listId/cards/:cardId",
  cardController.deleteCard,
);
router.patch(
  "/:boardId/lists/:listId/cards/reorder",
  cardController.reorderCards,
);

export default router;
