import {z} from "zod";

export const userNameValidation  = z
    .string()
    .min(2, "Username must be min length of 2 character")
    .max(20, "Username should not contain more than 8 characters")
    .regex(/^[a-zA-Z0-9]+$/
    ,"Username should not contain any special symbol")

export const signUpSchema = z.object({
    username : userNameValidation,
    email : z.email({message : "Please provide a valid email address"}),
    password : z.string().min(8,"Password must be min length of 8 character"),
})