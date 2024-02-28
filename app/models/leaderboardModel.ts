// used for current month leaderboard 
import { Model, Schema, model, models } from "mongoose"

interface LeaderboardDocument extends Document {
    id:string,
    userId:string,
    points:number,
    date:Date
}

const leaderboardSchema = new Schema({
    id:{
        type:String,
        default: () => `lb_${Math.random().toString(36).substring(2)}`,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    points:{
        type:Number,
        required:true
    }
})

const LeaderboardModel = models.Leaderboard || model("Leaderboard",leaderboardSchema)
export default LeaderboardModel as Model<LeaderboardDocument>