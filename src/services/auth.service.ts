import { UserRepository } from "../repositories/auth.repository";
import { CreateUserDto, LoginUserDto } from "../dtos/user.dto";
import bcryptjs from "bcryptjs";
import { HttpError } from "../errors/http-error";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

let userRepository = new UserRepository();
export class AuthService{
    async registerUser(data: CreateUserDto){
        // logic to register user, duplicate check, hash
        const emailExists = await userRepository.getUserByEmail(data.email);
        if(emailExists){ // if instance found, duplicate
            throw new HttpError(409, "Email already exists");
        }
        const usernameExists = await userRepository.getUserByUsername(data.username);
        if(usernameExists){
            throw new HttpError(400, "Username already exists");
        }
        // donot save plain text password, hash the password
        const hashedPassword = await bcryptjs.hash(data.password, 10); // 10 - complexity
        data.password = hashedPassword; // replace plain text with hashed password
        const newUser = await userRepository.createUser(data);
        return newUser;
    }

    async loginUser(data: LoginUserDto){
        const user = await userRepository.getUserByEmail(data.email);
        if(!user){
            throw new HttpError(404, "User not found");
        }
        const validPassowrd = await bcryptjs.compare(data.password, user.password);
        // plain text, hashed, not data.password == user.password
        if(!validPassowrd){
            throw new HttpError(401, "Invalid credentials");
        }
        // generate JWT token
        const payload = {
            id: user._id,
            email: user.email,
            username: user.username,
            role: user.role
        } // data to be stored in token
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '30d'});
        return { token, user }
    }
}