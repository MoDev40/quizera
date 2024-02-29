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

        connectDB()

        const leaderboard = await LeaderboardModel.find()
        .sort({ points: -1 })
        .populate({
          path: "user",
          model: "User",
          select:"name"
        })
        .skip((toNum - 1) * 20)
        .limit(20);

        return NextResponse.json({ message: "Successfully Fetched",data:leaderboard }, { status: 200 });
    } catch (error:any) {
        return NextResponse.json({ message: "Error: " + error.message }, { status: 500 });
    }
}