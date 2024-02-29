import QuizPlayground from '@/app/_component/QuizPlayground'
import React from 'react'
export const dynamic = 'force-dynamic'

const page = () => {
  return (
    <div className='w-full'>
      <QuizPlayground/>
    </div>
  )
}

export default page