'use client'
import { SessionProvider } from "next-auth/react"
import { Toaster } from "@/components/ui/sonner"
import React from "react"
import { UserProvider } from "@/app/hooks/UserContext"

const Provider = ({children}:{children:React.ReactNode}) => {
  return (
    <SessionProvider>
      <UserProvider>
        {children}
      </UserProvider>
        <Toaster />
    </SessionProvider>
  )
}

export default Provider