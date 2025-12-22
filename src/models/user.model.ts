import mongoose, { Document, Schema } from "mongoose";
import { UserType } from "../types/user.type";
const UserSchema: Schema = new Schema(
    {
        firstName: { type: String },
        lastName: { type: String },
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    },
    {
        timestamps: true, // auto createdAt and updatedAt
    }
)
export interface IUser extends UserType, Document{ // combined type
    _id: mongoose.Types.ObjectId; // mongo related attribute
    createdAt: Date;
    updatedAt: Date;
}
export const UserModel = mongoose.model<IUser>('User', UserSchema);
// collection name 'users' (plural of 'User')
// UserModel -> db.users