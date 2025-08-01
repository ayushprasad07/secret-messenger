import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import {z} from "zod";
import { userNameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
    username : userNameValidation
})

export async function GET(request : Request){

    await dbConnect();

    try {
        const {searchParams} = new URL(request.url);
        const queryParam = {
            username : searchParams.get("username")
        }

        //validate with zod
        const result = UsernameQuerySchema.safeParse(queryParam);
        // console.log(result);

        if(!result.success){
            const usernameError = result.error.format().username?._errors || [];
            return Response.json({
                success : false,
                message : usernameError ?. length>0 ? usernameError.join(', ') : "Invalid query parameter"
            },{
                status : 400
            })
        }

        const {username} = result.data;
        const existingVerifiedUser = await UserModel.findOne({username, isVerified : true});
        if(existingVerifiedUser){
            return Response.json({
                success : false,
                message : "Username already taken"
            },{
                status : 400
            })
        }

        return Response.json({
            success : true,
            message : "Username is available"
        },
        {
            status : 200
        }
    )

    } catch (error) {
        console.error("Error checking unique username",error);
        return Response.json({
            success : false,
            message : "Error checking username"
        },{
            status : 500
        })
    }
}