import { Model, Schema, model, models } from "mongoose"

interface LeaderboardDocument extends Document {
    user:Schema.Types.ObjectId,
    points:number,
    date:Date
}

const leaderboardSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
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