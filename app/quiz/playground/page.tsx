import QuizPlayground from '@/app/_component/QuizPlayground'
import React from 'react'

export const dynamic = 'force-dynamic'

const page = () => {
  return (
    <div className='container mx-auto'>
      <QuizPlayground/>
    </div>
  )
}

export default page