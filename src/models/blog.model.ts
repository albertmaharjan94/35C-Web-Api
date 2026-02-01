import mongoose, {Schema, Model} from "mongoose";
import { BlogType } from "../types/blog.type";

export interface IBlog extends Omit<BlogType, 'authorId'> {
    authorId: mongoose.Types.ObjectId; // mongo implementation of ObjectId
    _id: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
const blogSchema: Schema<IBlog> = new Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        authorId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true }
);
export const BlogModel: Model<IBlog> = mongoose.model<IBlog>('Blog', blogSchema);