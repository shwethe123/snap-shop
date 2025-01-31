import * as z from "zod";

const registerSchema = z.object({
    name : z.string().min(4,{
        message : "Please enter a valid name"
    }),
    email : z.string().email({
        message : "please enter a valid email adress"
    }),
    password : z.string().min(4, {
        message : "please enter a valid password."
    }),
})

export default registerSchema;