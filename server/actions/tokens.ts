"use server"

import { eq } from "drizzle-orm";
import { db } from "..";
import { emailVerificationToken } from "../schema";

const checkEmailVerificationToken = async (email : string ) => {
    try {
        const token = await db.query.emailVerificationToken.findFirst({
            where: eq(emailVerificationToken.email, email)
        })

        return token;
    } catch (error) {
        return null
    }
}

export const generateEmailVericificationToken = async (email : string) => {
    const token = crypto.randomUUID();
    const expires = new Date(new Date().getTime() + 30 * 60 * 1000);

    const existingToken = await checkEmailVerificationToken(email);
    //ရှိပြီသား email token ဖျက်ရန်
    if (existingToken) {
        try {
            await db.delete(emailVerificationToken).where(eq(emailVerificationToken.id, existingToken.id));
            console.log("Existing token deleted successfully");
        } catch (error) {
            console.error("Error deleting existing token:", error);
        }
    }
    // if (existingToken) {
    //     await db.delete(emailVerificationToken).where(eq(emailVerificationToken.id, existingToken.id));
    // }

    const verificationToken = await db.insert(emailVerificationToken).values(
        {
            email,
            token,
            expires
        }).returning();

    return verificationToken
}