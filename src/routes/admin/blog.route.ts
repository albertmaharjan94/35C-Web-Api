import { AdminBlogController } from "../../controllers/admin/blog.controller";
import { Router } from "express";
import { authorizedMiddelWare, adminMiddelware } from "../../middlewares/authorized.middleware";
const adminBlogRouter = Router();
const adminBlogController = new AdminBlogController();

adminBlogRouter.use(authorizedMiddelWare);
adminBlogRouter.use(adminMiddelware);

adminBlogRouter.get("/", adminBlogController.getAllBlogs);

export default adminBlogRouter;