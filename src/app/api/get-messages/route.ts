import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";


export async function GET(request : Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user : User = session?.user as User;

    if(!session || !session.user){
        return Response.json({
            success : false,
            message : "User not authenticated"
        },{
            status : 401
        })
    }

    const userId = new mongoose.Types.ObjectId(user._id);

    try {
        const user = await UserModel.aggregate([
            { $match : {_id : userId}},
            { $unwind : {path : "$messages", preserveNullAndEmptyArrays: true} },
            { $sort : { "messages.createdAt" : -1}},
            { $group : {
                _id : "$_id",
                messages : {
                    $push : "$messages"
                }
            }}
        ])

        if(!user || user.length === 0){
            return Response.json({
                success : false,
                message : "User not found in database"
            },{
                status : 404
            })
        }

        return Response.json({
            success : true,
            message : "Messages fetched successfully",
            messages : user[0].messages
        })
    } catch (error) {
        console.error("Error while fetching messages from database",error);
        return Response.json({
            success : false,
            message : "Error while fetching messages from database",
        },{
            status : 500
        })
    }
}