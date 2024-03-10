'use client'
import { signOut, useSession } from "next-auth/react";
import React, {Dispatch, createContext, useContext, useEffect, useState} from "react"

interface User {
    id: string;
    name: string;
    email: string;
    image: string;
}

export interface Choices {
    level: string;
    category_id: number;
    count: number;
    points: number;
}

interface ContextType{
    user:User | null;
    choices:Choices | null;
    setChoices:Dispatch<React.SetStateAction<Choices | null>>;
    logOut:()=>void;
}

const UserContext = createContext<ContextType>({} as ContextType)

export const UserProvider = ({children}:{children:React.ReactNode})=>{
    const {data} = useSession()
    const [choices,setChoices] = useState<Choices | null>(null)
    const [user,setUser] = useState<User | null>(null)

    const logOut = ()=>{
        if(new Date(data?.expires!).getTime() < new Date().getTime()){
            signOut()
        }
    }

    useEffect(()=>{

    },[choices])

    useEffect(()=>{
        setUser(data?.user as User)
    },[data?.user])

    useEffect(()=>{
        logOut()
    },[])
    return(
        <UserContext.Provider value={{user,logOut,choices,setChoices}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
  };