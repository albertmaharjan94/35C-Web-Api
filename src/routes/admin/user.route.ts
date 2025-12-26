import { Router } from "express";
import { AdminUserController } from "../../controllers/admin/user.controller";

const router: Router = Router();
const adminUserController = new AdminUserController();

router.post('/', adminUserController.createUser);

export default router;