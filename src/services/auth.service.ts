import { UserRepository } from "../repositories/auth.repository";
import { CreateUserDto } from "../dtos/user.dto";
import bcryptjs from "bcryptjs";
import { HttpError } from "../errors/http-error";
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
}