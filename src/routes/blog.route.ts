import { Router } from "express";
import { BlogController } from "../controllers/blog.controller";
import { authorizedMiddelWare } from "../middlewares/authorized.middleware";

const blogRouter = Router();
const blogController = new BlogController();

blogRouter.post("/", authorizedMiddelWare, blogController.createBlog);

blogRouter.get("/", blogController.getAllBlogs);

export default blogRouter;