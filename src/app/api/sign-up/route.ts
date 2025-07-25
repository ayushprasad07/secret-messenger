import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request : Request) {
    await dbConnect();

    try {
        const {username, email, password} = await request.json();
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified : true
        })

        if(existingUserVerifiedByUsername){
            return Response.json({
                success : false,
                message : "Username alreasy taken"
            },{
                status : 400
            })
        }

        const existingUserByEmail = await UserModel.findOne({email});
        const verifyCode = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000).toString();

        if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                return Response.json({
                    success : false,
                    message : "This email is already registered"
                },{
                    status : 400
                })
            }else{
                const hashedPassword = await bcrypt.hash(password,10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verificationCode = verifyCode;
                existingUserByEmail.verificationCodeExpiry = new Date(Date.now() + 60 * 60 * 1000);
                await existingUserByEmail.save();
            }
        }else{
            const hashedPassword = await bcrypt.hash(password,10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new  UserModel({
                username ,
                email ,
                password : hashedPassword,
                verificationCode : verifyCode,
                verificationCodeExpiry : expiryDate,
                messages : []
            })
            await newUser.save();
        }

        const emailResponse = await sendVerificationEmail(email,username,verifyCode);

        if(!emailResponse.success){
            return Response.json({
                success : false,
                message : emailResponse.message
            },{
                status : 500
            })
        }

        return Response.json({
                success : true,
                message : "User registered successfully. Please verify your email"
            },{
                status : 201
            })
    } catch (error) {
        console.error("Error registering error");
        return Response.json({success : false , message : "Error Regestering user"},{status : 500});
    }
}