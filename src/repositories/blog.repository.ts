import { IBlog } from "../models/blog.model";
import { BlogModel } from "../models/blog.model";

export interface IBlogRepository {
    create(blogData: any): Promise<IBlog>;
    findById(id: string): Promise<IBlog | null>;
    findAll(): Promise<IBlog[]>;
    update(id: string, blogData: any): Promise<IBlog | null>;
    delete(id: string): Promise<boolean>;
}

export class BlogRepository implements IBlogRepository {
    async create(blogData: any): Promise<IBlog> {
        const blog = new BlogModel(blogData);
        const newBlog = await blog.save();
        return newBlog;
    }

    async findById(id: string): Promise<IBlog | null> {
        const blog = await BlogModel.findById(id)
            .populate('authorId', 'email username');
        return blog;
    }
    
    async findAll(): Promise<IBlog[]> {
        const blogs = await BlogModel.find()
            .populate('authorId', 'email username')
            // .populate('comments'); // populate author details
        return blogs;
    }
    async update(id: string, blogData: any): Promise<IBlog | null> {
        const result = await BlogModel.findByIdAndUpdate(id, blogData, { new: true });
        return result;
    }

    async delete(id: string): Promise<boolean> {
        const deletedBlog = await BlogModel.findByIdAndDelete(id);
        return deletedBlog !== null;
    }
}