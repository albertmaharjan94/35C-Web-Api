import { Router } from "express";
import { AdminUserController } from "../../controllers/admin/user.controller";
import { authorizedMiddelWare } from "../../middlewares/authorized.middleware";
import { Request, Response } from "express";

const router: Router = Router();
const adminUserController = new AdminUserController();

router.post('/', authorizedMiddelWare ,adminUserController.createUser);

router.get(
    '/test', 
    authorizedMiddelWare,
    (req: Request, res: Response) => {
        res.send("Test route works");
    }
);

export default router;