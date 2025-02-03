"use server"

import registerSchema  from "@/types/register-schema";
import { actionClient } from "./safe-action";

import bcrypt from "bcrypt"
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { generateEmailVericificationToken } from "./tokens";
import { sendEmail } from "./emails";

export const register = actionClient.schema(registerSchema).action(async({parsedInput : {name,email, password}})=> {
    const hashedPassword = await bcrypt.hash(password, 10);
    //check user exist
    const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email)
    })

    if (existingUser) {
        if (!existingUser.emailVerified) {
            const verificationToken = await generateEmailVericificationToken(email)
            //Send verification email

            await sendEmail(verificationToken[0].email, verificationToken[0].token, name.slice(0, 5));

            return {succes : "Emsil verification resent"};
        }
        return {error : "Email is already exits"}
    }

    await db.insert(users).values({
        name,
        email,
        password: hashedPassword,
    })

    // generate verification token for email expire in 30 minutes
    const verificationToken = await generateEmailVericificationToken(email)

    await sendEmail(verificationToken[0].email, verificationToken[0].token, name.slice(0, 5));
    //create user

    //send verification email
    return { succes: "Email verification send"};
})