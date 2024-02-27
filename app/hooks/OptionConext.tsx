'use client'
import React, {createContext, useContext, useEffect} from "react"

interface Option {
    category: string;
    number: number;
    level: string;
}
const options : Option = {
    category: "",
    number: 5,
    level: ""
}

interface ContextType {
    option:Option | null;
    setOption: React.Dispatch<React.SetStateAction<Option | null>>;
}

const Context = createContext<ContextType>({} as ContextType)

export const OptionProvider = ({children}:{children:React.ReactNode})=>{
    const [option, setOption] = React.useState<Option | null>(options)
    useEffect(()=>{
        
    },[option])
    return (
        <Context.Provider value={{option, setOption}}>
            {children}
        </Context.Provider>
    )
}

export const useOption = ()=>{
    const context =useContext(Context)
    return context
}