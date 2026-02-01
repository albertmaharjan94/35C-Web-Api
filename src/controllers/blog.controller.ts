import { Request, Response } from "express";
import { BlogService } from "../services/blog.service";
const blogService = new BlogService();

export class BlogController {
    async createBlog(req: Request, res: Response) {
        try {
            const blogData = req.body;
            const userId = req.user?._id; // from auth middleware
            
            blogData.authorId = userId;
            const newBlog = await blogService.createBlog(blogData);
            return res.status(201).json(newBlog);
        } catch (error: Error | any) {
            return res.status(error.statusCode || 500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }

    async getAllBlogs(req: Request, res: Response) {
        try {
            const blogs = await blogService.getAllBlogs();
            return res.status(200).json(blogs);
        } catch (error: Error | any) {
            return res.status(error.statusCode || 500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }
}