import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authorizedMiddelWare } from "../middlewares/authorized.middleware";
import { uploads } from "../middlewares/upload.middleware";

const router: Router = Router();
const authController = new AuthController();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

router.get('/whoami', authorizedMiddelWare, authController.getUserProfile);

router.put(
    '/update-profile',
    authorizedMiddelWare,
    uploads.single('image'),
    authController.updateUser
)
export default router;