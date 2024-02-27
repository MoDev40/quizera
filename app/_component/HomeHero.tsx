'use client'
import React from 'react';
import NavBar from './NavBar';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {CategorySelection} from './CategorySelection';
import { SelectLevel } from './LevelSelection';
import { Input } from '@/components/ui/input';

const HomeHero = () => {
  const {data} = useSession()
  return (
    <>
    <NavBar/>
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Quizera</h1>
      <p className="text-lg text-center  text-gray-600 mb-8 capitalize">
        Unleash your knowledge and challenge yourself with captivating quizzes!
      </p>
        {
          data?.user ? <div className='flex items-center md:flex-row md:space-x-4'>
            <CategorySelection/> 
            <SelectLevel/>
            <Input placeholder='Number'/> 
          </div>: <Link href="/api/auth/signin">Sign in</Link>
        }
    </div>
    </>
  );
};

export default HomeHero;