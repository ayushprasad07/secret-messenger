import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";

export async function POST(request:Request){
    await dbConnect();

    try {
        const {username, verifyCode} = await request.json();

        const decodedUsername = decodeURIComponent(username);
        console.log(decodedUsername);
        const user = await UserModel.findOne({
            username : decodedUsername
        })

        if(!user){
            return Response.json({
                success : false,
                message : "User not found"
            },{
                status : 404
            })
        }

        const isValidCode = user.verificationCode === verifyCode;
        const isCodeNotExpired = new Date(user.verificationCodeExpiry) > new Date();

        if(isValidCode && isCodeNotExpired){
            user.isVerified = true;
            await user.save();
            return Response.json({
                success : true,
                message : "User verified successfully"
            },{
                status : 200
            })
        }else if (!isCodeNotExpired){
            return Response.json({
                success : false,
                message : "Verification code expired. Please Signup again to get new verification code"
            },{
                status : 400
            })
        }else{
            return Response.json({
                success : false,
                message : "Invalid verification code"
            },{
                status : 400
            })
        }

        
    } catch (error) {
        console.error("Error verifying user",error);
        return Response.json({
            success : false,
            message : "Error verifying user"
        },{
            status : 500
        })
    }
}