import { Router, Request, Response } from "express";
import { BookController } from "../controllers/book.controller";

const router: Router = Router();

// instance of BookController
const bookController = new BookController();

// use function from bookController instance
router.get('/', bookController.getBooks);
// make a router that handles GET request that takes bookid
// /:bookid and calls bookController.getBookById

export default router;