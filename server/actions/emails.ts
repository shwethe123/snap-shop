"use server"
import EmailComfirmationTemplate from "@/components/email-template";
import { getBaseUrl } from "@/lib/get-baseUrl"
import { Resend } from 'resend';

const currentBaseUrl = getBaseUrl();
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (email:string, token:string, userFirstname: string) => {
    const comfirmlink = `${currentBaseUrl}/confirm-email?token=${token}`;
    const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Confirm Your Account - Welcome to SnapShop',
        react: EmailComfirmationTemplate({
            userFirstname,
            comfirmEmailLink :comfirmlink
        })
      });
    
      if (error) {
        console.log(error)
      }
    
}