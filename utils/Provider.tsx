'use client'
import { OptionProvider } from "@/app/hooks/OptionConext"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "@/components/ui/sonner"
import React from "react"

const Provider = ({children}:{children:React.ReactNode}) => {
  return (
    <SessionProvider>
      <OptionProvider>
        {children}
        <Toaster />
      </OptionProvider>
    </SessionProvider>
  )
}

export default Provider