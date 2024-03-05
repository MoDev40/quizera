import { NextRequest,NextResponse } from "next/server";
import { connectDB } from "@/app/config/connectDB";
import UserModel from "@/app/models/userModel";
import LeaderboardModel from "@/app/models/leaderboardModel";

type Params = {
    email: string
}

export async function PUT(req:NextRequest,{params}:{params:Params}){
    try {

        const currentDate = new Date();

        const fullYear = currentDate.getFullYear();
        const fullMonth = currentDate.getMonth()
        
        const startDate = new Date(fullYear, fullMonth, 1)
        const endDate = new Date(fullYear, fullMonth + 1,0)

        connectDB();
        
        const {points}:{points:number} = await req.json();
        const {email} = params

        const user = await UserModel.findOne({email});

        if(!user){
            return NextResponse.json({message:"Error: User not found"},{status:400});
        }
        const leaderboard = await LeaderboardModel.updateOne(
            // searching for leader with both conditions 
            {
              $and: [
                {
                  date: {
                    $lte: endDate,
                    $gte:startDate
                  }
                },
                {
                  user:user?._id
                }
              ]
            },

            {
                // Update leaderboard if exists
              $set: {
                user: user?._id,
                date: startDate
              },
                // Increment the leaderboard point
              $inc: {
                points: points
              }
            },

            // create a new leaderboard is isn't exist
            {
              upsert: true
            }
          );
        if(!leaderboard){
            return NextResponse.json({ message: "Error: Failed to update leaderboard" }, { status: 400 });
        }
        return NextResponse.json({ message: "Success: Leaderboard updated" }, { status: 200 });
    } catch (error:any) {
        return NextResponse.json({ message: "Error: " + error.message }, { status: 500 });
    }
}