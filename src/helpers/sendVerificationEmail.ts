// import { resend } from "@/lib/resend";
// import verificationEmail from "../../emails/verificationEmail";
// import { ApiResponse } from "@/types/ApiResponse";

// export async function sendVerificationEmail(
//     email : string,
//     username : string,
//     verifyCode : string
// ) : Promise<ApiResponse>{
//     try {
//         const reponse = await resend.emails.send({
//         from: 'onboarding@resend.dev',
//         to: email,
//         subject: 'Secret-Message Verificatin email',
//         react: verificationEmail({username, otp : verifyCode}),
//         }); 
//         console.log("Response resend : ",reponse);
//         return {success : true, message : "Verification email send successfully"}
//     } catch (error) {
//         console.log("Email does not send",error);
//         return {success : false, message : "Failed to send the verification email"}
//     }
// }

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export async function sendVerificationEmail(email : string, username : string, verifyCode : string) {
    try {
        const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verification Code",
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
                <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
                    <h2 style="color: #6A5ACD;">Secret Messenger Verification</h2>
                    
                    <p style="font-size: 16px; color: #333;">Hi <strong>${username}</strong>,</p>
                    
                    <p style="font-size: 16px; color: #333;">
                    Thanks for signing up for <strong>Secret Messenger</strong>. To complete your registration, please use the following one-time verification code:
                    </p>
                    
                    <div style="font-size: 28px; font-weight: bold; color: #6A5ACD; text-align: center; margin: 30px 0;">
                    ${verifyCode}
                    </div>

                    <p style="font-size: 14px; color: #555;">
                    This code will expire in 10 minutes. If you didn&apos;t request this, you can safely ignore this email.
                    </p>

                    <p style="font-size: 12px; color: #aaa; text-align: center; margin-top: 40px;">
                    &copy; ${new Date().getFullYear()} Secret Messenger by Ayush Prasad
                    </p>
                </div>
            </div>
        `
    };
        await transporter.sendMail(mailOptions);
        return {success : true, message : "Verification email send successfully"}
    }catch{
        console.log("Email does not send");
        return {success : false, message : "Failed to send the verification email"}
    }
}