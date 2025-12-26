import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router: Router = Router();
const authController = new AuthController();

router.post('/register', authController.registerUser);

export default router;