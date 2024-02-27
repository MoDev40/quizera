import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { connectDB } from "./connectDB";
import UserModel from "../models/userModel";

const GOOGLE_CLIENT_ID = process.env.AUTH_GOOGLE_CLIENT_ID!
const GOOGLE_CLIENT_SECRET = process.env.AUTH_GOOGLE_CLIENT_SECRET!

export const authOptions : NextAuthOptions = {
    session:{
        strategy:"jwt"
    },
    providers:[
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,        
        })
    ],
    callbacks:{
        async signIn({profile}){

            if (!profile?.email) {
                throw new Error('No profile')
            }

            connectDB()
            await UserModel.updateOne({email:profile.email},{$set:{email:profile.email,name:profile.name,avatar:profile.image},upsert:true})
            return true
        }
    }
} 