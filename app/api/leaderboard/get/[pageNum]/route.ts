import { NextRequest,NextResponse } from "next/server";
import { connectDB } from "@/app/config/connectDB";
import LeaderboardModel from "@/app/models/leaderboardModel";

type Params = {
    pageNum: string
}

export async function GET(req:NextRequest,{params}:{params:Params}){
    try {
        const { pageNum } = params;
        const toNum = Number(pageNum)

        const currentDate = new Date();

        const fullYear = currentDate.getFullYear();
        const fullMonth = currentDate.getMonth()
        
        const startDate = new Date(fullYear, fullMonth, 1)
        const endDate = new Date(fullYear, fullMonth + 1,0)

        connectDB()

        const leaderboard = await LeaderboardModel.find({
            $or:[
                {
                    date: {
                        $lte: endDate,
                        $gte:currentDate
                    }
                },
                {
                    date: {
                        $lte: endDate,
                        $gte:startDate
                    }
                }
            ]
        })
        .sort({ points: -1 })
        .populate({
          path: "user",
          model: "User",
          select:"name"
        })
        .skip((toNum - 1) * 15)
        .limit(15);

        return NextResponse.json({ message: "Successfully Fetched",data:leaderboard }, { status: 200 });
    } catch (error:any) {
        return NextResponse.json({ message: "Error: " + error.message }, { status: 500 });
    }
}