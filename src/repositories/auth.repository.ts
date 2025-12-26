import { IUser, UserModel } from "../models/user.model";

export interface IUserRepository{
    createUser(data: Partial<IUser>): Promise<IUser>;
    getUserByEmail(email: string): Promise<IUser | null>;
    getUserByUsername(username: string): Promise<IUser | null>;
}

export class UserRepository implements IUserRepository{
    async createUser(data: Partial<IUser>){
        const newUser = new UserModel(data);
        await newUser.save(); // same as db.users.insertOne()
        return newUser;
    }
    async getUserByEmail(email: string){
        const user = await UserModel.findOne({ "email": email });
        return user;
    }
    async getUserByUsername(username: string){
        const user = await UserModel.findOne({ "username": username });
        return user;
    }
}