import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authorizedMiddelWare } from "../middlewares/authorized.middleware";

const router: Router = Router();
const authController = new AuthController();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

router.get('/whoami', authorizedMiddelWare, authController.getUserProfile);

export default router;