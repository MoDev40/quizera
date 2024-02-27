// used for history of based months.
import { Model, Schema, model, models } from "mongoose"

interface MonthLeaderDocument extends Document {
    id:string,
    userId:string,
    name:string,
    points:number,
    date:Date
}

const monthLeaderSchema = new Schema({
    id:{
        type:String,
        default: () => `ml_${Math.random().toString(36).substring(2)}`,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    points:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
})

const MonthLeaderModel = models.MonthLeader || model("MonthLeader",monthLeaderSchema)

export default  MonthLeaderModel as Model<MonthLeaderDocument>