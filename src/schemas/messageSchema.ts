import {z} from "zod";

export const messageSchema = z.object({
    content : z
        .string()
        .min(1, "Message must be min length of 1 character")
        .max(1000, "Message should not contain more than 1000 characters")
})