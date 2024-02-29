import { Model, Schema, model, models } from "mongoose"

interface userDocument extends Document {
    email:string,
    avatar:string,
    name:string
}

const userSchema = new Schema({
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