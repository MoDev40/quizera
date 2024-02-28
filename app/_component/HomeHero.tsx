'use client'
import React, { ChangeEvent } from 'react';
import NavBar from './NavBar';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {CategorySelection} from './CategorySelection';
import { SelectLevel } from './LevelSelection';
import { Input } from '@/components/ui/input';
import { useOption } from '../hooks/OptionConext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { toast } from "sonner"

const HomeHero = () => {
  const router = useRouter()
  const {data} = useSession()
  const {option,setOption} = useOption()
  const handelChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target
    setOption({...option,level:option?.level as string,category:option?.category as string, number:Number(value) || option?.number as number})
    }

    const handleStart = ()=>{
      if(!option || option.category == "" || option.level == ""){
        toast("Select Options..")
        return
      }
      router.push("/quiz/playground")
    }
   return (
    <>
    <NavBar/>
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Quizera</h1>
      <p className="text-lg text-center  text-gray-600 mb-8 capitalize">
        Unleash your knowledge and challenge yourself with captivating quizzes!
      </p>
        {
          data?.user ? <div className='flex space-y-4 md:space-y-0 flex-col items-center md:flex-row md:space-x-4'>
            <CategorySelection/> 
            <SelectLevel/>
            <Input onChange={handelChange} defaultValue={5} placeholder='Number'type='number'/>
            <Button onClick={handleStart} className={cn('w-full')}>Start Quiz</Button> 
          </div>: <Link href="/api/auth/signin">Sign in</Link>
        }
    </div>
    </>
  );
};

export default HomeHero;