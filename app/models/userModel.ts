import { Model, Schema, model, models } from "mongoose"

interface userDocument extends Document {
    id:string,
    email:string,
    avatar:string,
    name:string
}

const userSchema = new Schema({
    id:{
        type:String,
        default: () => `usr_${Math.random().toString(36).substring(2)}`,
        required:true
    },
    email: {
        type: String,
        unique: true,
      },
    name: { type:String },
    avatar: { type:String },
},
{timestamps:true}
)

const UserModel = models.User || model("User",userSchema)

export default  UserModel as Model<userDocument>