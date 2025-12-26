import z from "zod";
import { userSchema } from "../types/user.type";
export const CreateUserDto = userSchema.pick( // re use userSchema
    {
        firstName: true, // true - include from userSchema
        lastName: true,
        email: true,
        username: true,
        password: true
    }
).extend( // add new attriute to schema
    {
        confirmPassword: z.string().min(6)
    }
).refine( // extra validation from existing attributess
    (data) => data.password === data.confirmPassword,
    {
        message: "Password and Confirm Password must match",
        path: ["confirmPassword"] // throws error on confirmPassword field
    }
)
export type CreateUserDto = z.infer<typeof CreateUserDto>;