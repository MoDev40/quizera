'use client'
import { Button } from '@/components/ui/button'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const NavBar = () => {
    const router = useRouter()
    const {data} = useSession()

    const handleSignIn = async()=>{
        await signIn("google")
    }
    const handleSignOut = async()=>{
        await signOut()
        router.push("/")
    }

  return (
    <div className='w-full md:w-[1120px] md:mx-auto p-4 flex flex-row justify-between items-center'>
        <div>
        <Link href="/">
            <Button variant="outline">Gallery</Button>
        </Link>
        </div>
        <div className='space-x-3'>
        { data?.user?
        (   
            <div className='space-x-2'>
                <Link href="/upload-img">
                    <Button className='rounded-sm' variant="outline">Leaderboard</Button>
                </Link>
                <Button onClick={handleSignOut} className='rounded-md' variant="destructive">Log out</Button>
            </div>
        ):
        (
            <Button onClick={handleSignIn} className='rounded-sm' variant="outline">Sign in with google</Button>
        )
        }
        </div>
    </div>
  )
}

export default NavBar