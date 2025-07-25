import { resend } from "@/lib/resend";
import verificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email : string,
    username : string,
    verifyCode : string
) : Promise<ApiResponse>{
    try {
        await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Secret-Message Verificatin email',
        react: verificationEmail({username, otp : verifyCode}),
        }); 
        return {success : true, message : "Verification email send successfully"}
    } catch (error) {
        console.log("Email does not send",error);
        return {success : false, message : "Failed to send the verification email"}
    }
}