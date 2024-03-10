'use client'
import { Button } from '@/components/ui/button'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useUser } from '../hooks/UserContext'

const NavBar = () => {
    const router = useRouter()
    const {user} = useUser()

    const handleSignIn = async()=>{
        await signIn("google")
    }
    const handleSignOut = async()=>{
        await signOut()
        window.localStorage.clear()
        router.push("/")
    }

  return (
    <div className='p-4  space-x-2 flex flex-row justify-between items-center'>
        <div>
        <Link href="/">
            <Button variant="outline">Quizera</Button>
        </Link>
        </div>
        <div className='space-x-3'>
        { user?
        (   
            <div className='space-x-2 flex flex-row'>
                <Link href="/leaderboard">
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